import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MusicPlayer from "./components/MusicPlayer";
import { SITE } from "./lib/site";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: "Mechatronics Student & Developer",
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    addressCountry: "US",
  },
  affiliation: {
    "@type": "HighSchool",
    name: "Brooklyn Technical High School",
  },
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout: [
    "Mechatronics",
    "Robotics",
    "Mechanical engineering",
    "CAD",
    "Web development",
    "TypeScript",
    "Next.js",
    "Design systems",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Kevin Zheng — Mechatronics Student & Developer",
    template: "%s — Kevin Zheng",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    "Kevin Zheng",
    "mechatronics",
    "robotics",
    "Brooklyn Technical High School",
    "developer",
    "portfolio",
    "TypeScript",
    "Next.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Kevin Zheng — Mechatronics Student & Developer",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Zheng — Mechatronics Student & Developer",
    description: SITE.description,
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0d100f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jbmono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("kz-theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light";}catch(e){}})()',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
