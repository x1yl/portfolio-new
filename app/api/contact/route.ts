import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface ContactPayload {
  subject: string;
  email: string;
  message: string;
}

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_TO,
  CONTACT_FROM,
  TURNSTILE_SECRET_KEY,
} = process.env;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body.");
  }

  const payload = body as Record<string, unknown>;
  const { subject, email, message } = payload;

  if (!subject || !email || !message) {
    throw new Error("All fields are required.");
  }

  if (
    typeof subject !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    throw new Error("Invalid field types.");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  return {
    subject: subject.trim(),
    email: email.trim(),
    message: message.trim(),
  };
}

function getTurnstileToken(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const token = (body as { token?: unknown }).token;
  return typeof token === "string" ? token : null;
}

export async function POST(request: Request) {
  try {
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please set SMTP_* and CONTACT_TO env vars.",
        },
        { status: 500 },
      );
    }

    const body: unknown = await request.json();
    const payload = validatePayload(body);
    const turnstileToken = getTurnstileToken(body);

    if (!TURNSTILE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Turnstile not configured. Please set TURNSTILE_SECRET_KEY env var.",
        },
        { status: 500 },
      );
    }
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Verification failed. Please retry." },
        { status: 400 },
      );
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      },
    );
    const verifyData = await verifyRes.json();
    if (!verifyData?.success) {
      return NextResponse.json(
        { error: "Verification failed." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: payload.email,
      subject: `New contact: ${payload.subject}`,
      text: `Email: ${payload.email}\nSubject: ${payload.subject}\n\n${payload.message}`,
      html: `<p><strong>Email:</strong> ${payload.email}</p><p><strong>Subject:</strong> ${payload.subject}</p><p>${payload.message.replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send message.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
