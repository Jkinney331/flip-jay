'use client'
// import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
// import Link from "next/link";
import React from "react";
import { LiquidButton } from "../ui/Liquid-button";
import Hyperspeed from "../ui/hyperspeed-component";
import { hyperspeedPresets } from "@/components/ui/hyperspeed";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "next-themes";
import { useHeroContent, useDomainContent } from "@/hooks/useDomainContent";
import { Logo } from "@/components/ui/logo";

const HeroSection = () => {
  const heroContent = useHeroContent();
  const { config } = useDomainContent();
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="hero" className="w-full relative mt-4">
      {isMounted && (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] absolute top-0 left-0 overflow-hidden">
          <Hyperspeed 
            theme={theme as "light" | "dark"}
            effectOptions={hyperspeedPresets(theme as "light" | "dark").one}
          />   
        </div>
      )}
      {prefersReducedMotion && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        />
      )}
      <div className="relative flex flex-col items-center w-full px-6">
        {/* <div className="absolute inset-0">
          <div className="absolute inset-0 -z-10 h-[600px] md:h-[800px] w-full animated-bg rounded-b-xl" />

        </div> */}
        <div className="relative z-10 pt-32 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          {/* Social Proof Badge */}
          {heroContent.socialProof && (
            <div className="border border-primary/20 bg-primary/10 rounded-full text-sm h-8 px-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {heroContent.socialProof.badge}
            </div>
          )}
          
          <div className="flex flex-col items-center justify-center gap-5">
            {/* Logo */}
            <Logo 
              size="lg" 
              showTagline={true} 
              taglineColor="black"
              className="mb-4"
            />
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-medium tracking-tighter text-balance text-center text-primary">
              {heroContent.title}
            </h1>
            <p className="text-base md:text-lg xl:text-2xl text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {heroContent.subtitle}
            </p>
            <p className="text-base md:text-lg xl:text-xl text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {heroContent.support_text}
            </p>
          </div>
          
          <div className="flex items-center gap-2.5 flex-wrap justify-center mb-2">
            <LiquidButton 
              className="cursor-pointer min-h-[44px] min-w-[120px] text-base px-6 py-3" 
              onClick={() => window.location.href = heroContent.cta.primary.href}
            >
              {heroContent.cta.primary.text}
            </LiquidButton>
            
            {heroContent.cta.secondary && (
              <button
                onClick={() => window.location.href = heroContent.cta.secondary.href}
                className="h-10 flex items-center justify-center w-32 px-5 text-sm font-normal tracking-wide text-primary rounded-full transition-all ease-out active:scale-95 bg-white dark:bg-background border border-[#E5E7EB] dark:border-[#27272A] hover:bg-white/80 dark:hover:bg-background/80"
              >
                {heroContent.cta.secondary.text}
              </button>
            )}
          </div>
          
          {/* Domain-specific metric */}
          {heroContent.socialProof?.metric && (
            <div className="text-sm text-muted-foreground text-center">
              {heroContent.socialProof.metric}
            </div>
          )}
        </div>
      </div>
      {/* <HeroVideoSection /> */}
    </section>
  );
}

export default HeroSection;