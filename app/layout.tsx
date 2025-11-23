import type { Metadata } from "next";
import { Geist, Geist_Mono, Rock_Salt } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rockSalt = Rock_Salt({
  weight: "400",
  variable: "--font-rock-salt",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Zheng",
  description: "Personal website and portfolio of Kevin Zheng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rockSalt.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
