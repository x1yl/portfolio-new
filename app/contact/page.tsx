import type { Metadata } from "next";
import SiteShell from "../components/SiteShell";
import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kevin Zheng — mechatronics and robotics student and developer in Brooklyn, New York.",
  alternates: { canonical: "/contact" },
};

const INFO = [
  {
    label: "GitHub",
    value: "github.com/x1yl",
    href: SITE.github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kevzheng",
    href: SITE.linkedin,
  },
  {
    label: "Location",
    value: "Brooklyn, New York",
    href: null,
  },
  {
    label: "Response time",
    value: "24–48 hours",
    href: null,
  },
];

const TOPICS = [
  "Mechatronics",
  "Robotics",
  "CAD & drafting",
  "Web tools",
  "Design systems",
];

export default function Contact() {
  return (
    <SiteShell>
      <div className="mx-auto flex min-h-[75vh] max-w-6xl items-center px-6 py-16">
        <div className="grid w-full items-start gap-10 md:grid-cols-[260px_1fr] md:gap-16">
          <div>
            <p className="micro mb-3">Contact</p>
            <h1 className="mb-10 font-serif text-4xl font-semibold md:text-5xl">
              Say hi.
            </h1>

            <div className="space-y-6">
              <div>
                <p className="micro mb-1">Email</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="break-all font-medium transition-colors hover:text-(--brand)"
                  >
                    {SITE.email}
                  </a>
                  <CopyEmail />
                </div>
              </div>

              {INFO.map((item) => (
                <div key={item.label}>
                  <p className="micro mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all font-medium transition-colors hover:text-(--brand)"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="micro mb-2">Ask me about</p>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <span key={topic} className="chip text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </SiteShell>
  );
}
