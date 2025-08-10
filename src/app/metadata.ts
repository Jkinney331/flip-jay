import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "FlipTech Pro",
    "AI Solutions",
    "AI Development",
    "Business Automation",
    "AI Integration",
    "Machine Learning",
    "Artificial Intelligence",
    "AI Consulting",
    "Custom AI",
    "AI Implementation",
    "Enterprise AI",
    "AI Transformation",
  ],
  authors: [
    {
      name: "FlipTech Pro",
      url: "https://fliptechpro.com",
    },
  ],
  creator: "fliptechpro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@fliptechpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
