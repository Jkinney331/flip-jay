"use client";

import { useState, useEffect } from "react";
import { LiquidButton } from "./Liquid-button";
import { DollarSign } from "lucide-react";

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
        className="!rounded-full w-20 h-12 shadow-xl shadow-black/30 cursor-pointer flex items-center justify-center !bg-green-600 hover:!bg-green-700 active:!bg-green-800 text-white border-2 border-white/20 touch-manipulation text-xs font-semibold px-3"
        aria-label="Get Quote"
      >
        <DollarSign className="w-4 h-4 mr-1" />
        $75/hr
      </LiquidButton>
    </div>
  );
}
