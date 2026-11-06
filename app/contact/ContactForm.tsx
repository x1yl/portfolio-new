"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

declare global {
  interface Window {
    turnstile?: {
      getResponse?: () => string | undefined;
      reset?: () => void;
    };
  }
}

export default function ContactForm() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const token = window.turnstile?.getResponse?.();
    if (!token) {
      setStatus("error");
      setError("Verification is still loading. Please try again in a moment.");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, email, message, token, website }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Try again?");
      }

      setStatus("sent");
      setSubject("");
      setEmail("");
      setMessage("");
      setWebsite("");
      window.turnstile?.reset?.();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again?",
      );
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
      />
      <form onSubmit={handleSubmit} className="hard-card w-full space-y-4 p-6">
        <Input
          name="subject"
          aria-label="Subject"
          placeholder="Subject"
          autoComplete="off"
          maxLength={200}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <Input
          name="email"
          type="email"
          aria-label="Your email"
          placeholder="Your email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Textarea
          name="message"
          aria-label="Message"
          placeholder="Message"
          rows={6}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div
          className="hidden"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          <label>
            Website
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />

        <Button
          type="submit"
          disabled={status === "sending"}
          className="btn-hard w-full rounded-md! disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>

        <div aria-live="polite" className="min-h-5">
          {status === "sent" && (
            <p className="text-sm font-medium text-(--brand)">
              Sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-[#b3261e]">{error}</p>
          )}
        </div>
      </form>
    </>
  );
}
