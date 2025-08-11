"use client";

import { useState, useEffect } from "react";
import { LiquidButton } from "./Liquid-button";
import { Phone } from "lucide-react";

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (roughly 800px)
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <LiquidButton
        onClick={() => {
          const element = document.getElementById("contact");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="!rounded-full w-14 h-14 shadow-lg shadow-black/20 cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white border-2 border-white/20"
      >
        <Phone className="w-6 h-6" />
      </LiquidButton>
    </div>
  );
}
