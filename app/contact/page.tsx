"use client";
import { useState } from "react";
import Script from "next/script";
import SiteShell from "../components/SiteShell";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const INFO = [
  {
    label: "GitHub",
    value: "github.com/x1yl",
    href: "https://github.com/x1yl",
  },
  {
    label: "Email",
    value: "contact@kevinzheng.fyi",
    href: "mailto:contact@kevinzheng.fyi",
  },
  { label: "Location", value: "Brooklyn, New York", href: null },
  { label: "Response time", value: "24–48 hours", href: null },
];

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const token = (window as any).turnstile?.getResponse?.();
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, email, message, token }),
      });
      setStatus(r.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteShell>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
      />
      <div className="max-w-4xl mx-auto px-6 min-h-[75vh] flex items-center">
        <div className="grid md:grid-cols-[220px_1fr] gap-12 w-full py-16">
          <div>
            <p className="micro mb-3">Contact</p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-10">
              Say hi.
            </h1>
            <div className="space-y-6">
              {INFO.map((i) => (
                <div key={i.label}>
                  <p className="micro mb-1">{i.label}</p>
                  {i.href ? (
                    <a
                      href={i.href}
                      className="font-medium hover:text-(--brand) transition-colors break-all"
                    >
                      {i.value}
                    </a>
                  ) : (
                    <p>{i.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="hard-card p-6 space-y-4 max-w-lg w-full">
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            placeholder="Message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
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
          {status === "sent" && (
            <p className="text-sm font-medium text-(--brand)">
              Sent — I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-[#b3261e]">
              Something went wrong. Try again?
            </p>
          )}
        </form>
      </div>
    </SiteShell>
  );
}
