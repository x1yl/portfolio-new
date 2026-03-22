"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Menu } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons";
import { ParallaxLink } from "@/app/components/ParallaxLink";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardTitle } from "@/app/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

export default function Contact() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isTurnstileConfigured =
    typeof turnstileSiteKey === "string" && turnstileSiteKey.length > 0;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formState, setFormState] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [feedbackTone, setFeedbackTone] = useState<"success" | "error" | null>(
    null,
  );
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "sending") return;

    setSubmitState("sending");
    setFeedback("");
    setFeedbackTone(null);

    try {
      if (!isTurnstileConfigured) {
        setSubmitState("error");
        setFeedback("Contact form verification is not configured.");
        setFeedbackTone("error");
        return;
      }

      if (!turnstileToken) {
        setSubmitState("error");
        setFeedback("Please complete the verification.");
        setFeedbackTone("error");
        return;
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, token: turnstileToken }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to send message. Please try again.",
        );
      }

      setSubmitState("sent");
      setFormState({ subject: "", email: "", message: "" });
      setFeedback("Thanks! I’ll get back to you within 24-48 hours.");
      setFeedbackTone("success");

      setTimeout(() => {
        setSubmitState("idle");
        setFeedback("");
        setFeedbackTone(null);
        setTurnstileToken(null);
      }, 4000);
    } catch (err) {
      setSubmitState("error");
      setFeedback(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setFeedbackTone("error");
      setTimeout(() => {
        setSubmitState("idle");
        setFeedback("");
        setFeedbackTone(null);
      }, 2500);
    }
  };

  const bgMove = 20;

  return (
    <main className="relative w-screen h-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden text-strong">
      <div
        className="fixed -inset-12.5 w-[calc(100%+100px)] h-[calc(100%+100px)] transition-transform duration-100 ease-out pointer-events-none"
        style={{
          transform: `translate(${-mousePos.x * bgMove}px, ${
            -mousePos.y * bgMove
          }px)`,
        }}
      >
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col p-6 pb-24 md:p-8 md:pb-12 lg:p-10">
        <header className="relative z-50 flex justify-between items-start text-slate-100 mb-8 md:mb-10">
          <Link
            href="/"
            className="font-serif tracking-widest opacity-70 hover:opacity-100 transition-opacity animate-cascade"
          >
            © Kevin Zheng
          </Link>
          <nav className="hidden md:flex font-serif gap-8 tracking-wide">
            {["Projects", "About", "Contact"].map((item, i) => (
              <ParallaxLink
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`px-4 py-2 hover:opacity-60 transition-opacity animate-cascade ${
                  item === "Contact" ? "border-b border-slate-100" : ""
                }`}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                {item}
              </ParallaxLink>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="md:hidden text-strong"
                aria-label="Open navigation menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
                <SheetDescription>
                  Quick links to portfolio sections.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-3">
                {["Home", "Projects", "About", "Contact"].map((item) => (
                  <Button
                    key={item}
                    asChild
                    variant="secondary"
                    className="justify-start normal-case tracking-normal"
                  >
                    <a href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                      {item}
                    </a>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <div className="max-w-7xl mx-auto w-full flex-1 min-h-0 flex flex-col">
          <h1
            className="text-5xl md:text-6xl font-serif text-slate-100 mb-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Get In Touch
          </h1>
          <p
            className="text-base md:text-lg text-soft font-serif mb-6 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Have a question or want to work together? I&apos;d love to hear from
            you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 animate-fade-up lg:col-span-2 lg:overflow-y-auto lg:pr-2"
              style={{ animationDelay: "0.5s" }}
            >
              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="mb-2 block">
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  required
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  placeholder="Project inquiry, collaboration, etc."
                />
              </div>

              <div>
                <Label htmlFor="message" className="mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="resize-none"
                  placeholder="Your message..."
                />
              </div>

              {isTurnstileConfigured ? (
                <>
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    className="mt-2"
                  />
                  {!turnstileToken && (
                    <p className="mt-2 text-xs font-serif text-slate-100/95">
                      Complete verification to enable Send.
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-xs font-serif text-red-200">
                  Turnstile site key is missing. Set
                  NEXT_PUBLIC_TURNSTILE_SITE_KEY.
                </p>
              )}

              <Button
                ref={btnRef}
                type="submit"
                disabled={
                  submitState === "sending" ||
                  !turnstileToken ||
                  !isTurnstileConfigured
                }
                className="w-full disabled:grayscale"
              >
                <span>
                  {submitState === "idle" && "Send Message"}
                  {submitState === "sending" && "Sending..."}
                  {submitState === "sent" && "Message Sent! ✓"}
                  {submitState === "error" && "Try Again"}
                </span>
              </Button>
              {feedback && (
                <div
                  className={`mt-4 px-4 py-3 rounded-lg border font-serif text-sm ${
                    feedbackTone === "error"
                      ? "bg-red-500/15 border-red-500/40 text-red-100"
                      : "bg-emerald-500/15 border-emerald-500/40 text-emerald-100"
                  }`}
                >
                  {feedback}
                </div>
              )}
            </form>

            {/* Social Links & Info */}
            <div className="space-y-5 lg:col-span-1 lg:overflow-y-auto lg:pr-2">
              <Card
                className="animate-fade-up"
                style={{ animationDelay: "0.6s" }}
              >
                <CardContent className="p-6">
                  <CardTitle className="mb-4">Connect With Me</CardTitle>
                  <div className="space-y-3">
                    <a
                      href="https://github.com/x1yl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-50 hover:text-white hover:underline transition-colors group"
                    >
                      <SiGithub
                        size={20}
                        color="currentColor"
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="font-serif text-md">GitHub</span>
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4" />
                    </a>

                    <a
                      href="https://linkedin.com/in/kevzheng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-50 hover:text-white hover:underline transition-colors group"
                    >
                      <svg
                        className="w-5 h-5 group-hover:scale-110 transition-transform"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="font-serif text-md">LinkedIn</span>
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4" />
                    </a>

                    <a
                      href="mailto:kevin@kevinzheng.fyi"
                      className="flex items-center gap-3 text-slate-50 hover:text-white hover:underline transition-colors group"
                    >
                      <SiGmail
                        size={20}
                        color="currentColor"
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="font-serif text-md">Email</span>
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="animate-fade-up"
                style={{ animationDelay: "0.7s" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-slate-100 mt-0.5 shrink-0" />
                    <h3 className="text-xl font-serif text-slate-100">
                      Location
                    </h3>
                  </div>
                  <p className="text-slate-100 font-serif leading-relaxed text-md">
                    Brooklyn, New York,
                    <br />
                    United States
                  </p>
                </CardContent>
              </Card>

              <Card
                className="animate-fade-up"
                style={{ animationDelay: "0.8s" }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-2 mb-2">
                    <Clock className="w-5 h-5 text-slate-100 mt-0.5 shrink-0" />
                    <h3 className="text-xl font-serif text-slate-100">
                      Availability
                    </h3>
                  </div>
                  <p className="text-slate-100 font-serif leading-relaxed text-md">
                    Currently available for freelance work and collaborations. I
                    typically respond within 24-48 hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
