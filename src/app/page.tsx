import HomeScreen from "@/components/home-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiny-URL",
  description:
    "Make your links cleaner, more shareable, and easier to remember. Our URL shortener service transforms long, cluttered URLs into simple, clickable links in just seconds.",
  keywords: [
    "url shortener",
    "tiny url",
    "short url",
    "javascript",
    "react",
    "nextjs",
    "service",
  ],
  openGraph: {
    type: "website",
    title: "Tiny-URL",
    description:
      "Make your links cleaner, more shareable, and easier to remember. Our URL shortener service transforms long, cluttered URLs into simple, clickable links in just seconds.",
  },
};

export default function Home() {
  return <HomeScreen />;
}
