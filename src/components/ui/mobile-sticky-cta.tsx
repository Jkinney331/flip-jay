"use client";

import { useState, useEffect } from "react";
import { LiquidButton } from "./Liquid-button";
import { Phone } from "lucide-react";

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after minimal scrolling (roughly 200px - first scroll)
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <LiquidButton
        onClick={() => {
          const element = document.getElementById("contact");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="!rounded-full w-16 h-16 shadow-xl shadow-black/30 cursor-pointer flex items-center justify-center !bg-blue-600 hover:!bg-blue-700 active:!bg-blue-800 text-white border-2 border-white/20 touch-manipulation"
        aria-label="Contact us"
      >
        <Phone className="w-7 h-7" />
      </LiquidButton>
    </div>
  );
}
