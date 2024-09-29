import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tiny-URL",
  description:
    "Make your links cleaner, more shareable, and easier to remember. Our URL shortener service transforms long, cluttered URLs into simple, clickable links in just seconds.",
  openGraph: {
    siteName: "Tiny-URL",
    type: "website",
    description:
      "Make your links cleaner, more shareable, and easier to remember. Our URL shortener service transforms long, cluttered URLs into simple, clickable links in just seconds.",
  },
  keywords: [
    "url shortener",
    "tiny url",
    "short url",
    "javascript",
    "react",
    "nextjs",
    "service",
  ],
  applicationName: "Tiny-URL",
  appleWebApp: {
    title: "Tiny-URL",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
