import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  subject: string;
  email: string;
  message: string;
}

class ValidationError extends Error {}

const MAX = {
  subject: 200,
  email: 254,
  message: 5000,
};

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
    throw new ValidationError("Invalid request body.");
  }

  const payload = body as Record<string, unknown>;
  const { subject, email, message } = payload;

  if (
    typeof subject !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    throw new ValidationError("All fields are required.");
  }

  const cleanSubject = subject.replace(/[\r\n]+/g, " ").trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanSubject || !cleanEmail || !cleanMessage) {
    throw new ValidationError("All fields are required.");
  }

  if (cleanSubject.length > MAX.subject) {
    throw new ValidationError("Subject is too long.");
  }

  if (cleanEmail.length > MAX.email || !emailRegex.test(cleanEmail)) {
    throw new ValidationError("Please enter a valid email address.");
  }

  if (cleanMessage.length > MAX.message) {
    throw new ValidationError("Message is too long.");
  }

  return {
    subject: cleanSubject,
    email: cleanEmail,
    message: cleanMessage,
  };
}

function getTurnstileToken(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const token = (body as { token?: unknown }).token;
  return typeof token === "string" ? token : null;
}

function isHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") {
    return false;
  }

  const website = (body as { website?: unknown }).website;
  return typeof website === "string" && website.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
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

    const body: unknown = await request.json().catch(() => null);

    if (isHoneypotFilled(body)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

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

    const remoteip = request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim();

    const verifyBody = new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    });
    if (remoteip) {
      verifyBody.set("remoteip", remoteip);
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verifyBody,
      },
    );
    const verifyData = (await verifyRes.json()) as { success?: boolean };

    if (!verifyData.success) {
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

    const safeEmail = escapeHtml(payload.email);
    const safeSubject = escapeHtml(payload.subject);
    const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: payload.email,
      subject: `New contact: ${payload.subject}`,
      text: `Email: ${payload.email}\nSubject: ${payload.subject}\n\n${payload.message}`,
      html: `<p><strong>Email:</strong> ${safeEmail}</p><p><strong>Subject:</strong> ${safeSubject}</p><p>${safeMessage}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Contact form failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
