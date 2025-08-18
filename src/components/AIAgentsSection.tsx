"use client";

import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  ShoppingCart,
  Palette,
  Smartphone,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Orb from "@/components/ui/Orb";
import { LiquidButton } from "@/components/ui/Liquid-button";
import { useDomainContent } from "@/hooks/useDomainContent";

interface Service {
  id: number;
  name: string;
  role: string;
  badge: string;
  description: string;
  capabilities: string[];
  icon: React.ComponentType<{ className?: string; size?: number }>;
  specialty: string;
  hue: number;
}

// Content for development services
const getServiceContent = (config: any): Service[] => {
  return [
    {
      id: 1,
      name: "Development & Engineering",
      role: "Full-Stack Development Team",
      badge: "ENGINEERING",
      description: "React, Vue, Node.js, PHP, Python—I build it all.",
      capabilities: [
        "Custom web applications",
        "API development & integration",
        "Database architecture",
        "Performance optimization",
        "Bug fixes & maintenance"
      ],
      icon: Code,
      specialty: "Engineering",
      hue: 220 // Deep Blue
    },
    {
      id: 2,
      name: "CMS & E-Commerce",
      role: "Platform Specialists",
      badge: "CMS EXPERTS",
      description: "WordPress, Shopify, Squarespace, WooCommerce.",
      capabilities: [
        "Custom theme development",
        "Plugin creation & customization",
        "Store setup & optimization",
        "Migration & upgrades",
        "Speed optimization"
      ],
      icon: ShoppingCart,
      specialty: "CMS",
      hue: 120 // Bright Green
    },
    {
      id: 3,
      name: "Design & UX/UI",
      role: "Creative Design Team",
      badge: "DESIGN",
      description: "Beautiful, functional design that converts.",
      capabilities: [
        "Web & mobile design",
        "User experience optimization",
        "Design systems & style guides",
        "Prototyping & wireframing",
        "Brand identity"
      ],
      icon: Palette,
      specialty: "Design",
      hue: 300 // Purple
    },
    {
      id: 4,
      name: "Mobile Development",
      role: "iOS & Android Specialists",
      badge: "MOBILE",
      description: "Native and cross-platform solutions.",
      capabilities: [
        "React Native development",
        "Flutter applications",
        "App store optimization",
        "Push notifications & analytics",
        "API integrations"
      ],
      icon: Smartphone,
      specialty: "Mobile",
      hue: 45 // Orange
    },
    {
      id: 5,
      name: "Growth & Marketing",
      role: "Digital Growth Partners",
      badge: "GROWTH",
      description: "Launch strategy and go-to-market execution.",
      capabilities: [
        "Landing page optimization",
        "A/B testing setup",
        "Analytics implementation",
        "SEO technical setup",
        "Marketing automation"
      ],
      icon: TrendingUp,
      specialty: "Growth",
      hue: 180 // Cyan
    }
  ];
};

function ServicesSection() {
  const { config } = useDomainContent();
  const serviceData = getServiceContent(config);
  
  const [viewportRef, embla] = useEmblaCarousel({ align: "center", loop: true });

  const palette = useMemo(
    () => ({
      Engineering: "from-blue-500 to-cyan-500",
      CMS: "from-emerald-500 to-green-400",
      Design: "from-fuchsia-500 to-pink-500",
      Mobile: "from-amber-400 to-orange-500",
      Growth: "from-emerald-500 to-green-400",
      Default: "from-slate-300 to-slate-500",
    }),
    []
  );

  return (
    <section id="services" className="py-16 lg:py-32 dark:bg-zinc-900 bg-white">
      <div className="mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Recent work that reflects my range.
          </p>
        </div>

        {/* Full-width carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="flex">
              {serviceData.map((service) => {
                const gradient = palette[service.specialty as keyof typeof palette] || palette.Default;

                return (
                  <div key={service.id} className="flex-[0_0_100%] px-4">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
                      {/* Large Orb */}
                      <div className="flex justify-end order-1">
                        <div className="w-[600px] h-[600px]">
                          <Orb
                            hue={service.hue}
                            hoverIntensity={0.41}
                            rotateOnHover={true}
                            forceHoverState={false}
                          />
                        </div>
                      </div>

                      {/* Clean profile card */}
                      <div className="order-2 flex flex-col justify-center">
                        <div className="space-y-8">
                          {/* Specialty badge */}
                          <div className="animate-fade-up animate-delay-100">
                            <Badge 
                              variant="outline" 
                              className="text-xs tracking-widest font-bold px-4 py-2 bg-muted/50 text-muted-foreground border-muted-foreground/20"
                            >
                              {service.badge}
                            </Badge>
                          </div>

                          {/* Service name */}
                          <div className="animate-fade-up animate-delay-200">
                            <h3 className="text-6xl font-bold text-foreground">
                              {service.name}
                            </h3>
                          </div>

                          {/* Description */}
                          <div className="animate-fade-up animate-delay-300">
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                              {service.description}
                            </p>
                          </div>

                          {/* Key Capabilities */}
                          <div className="animate-fade-up animate-delay-[400ms]">
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-foreground">
                                Key Capabilities
                              </h4>
                              <ul className="space-y-3">
                                {service.capabilities.map((capability, index) => (
                                  <li 
                                    key={index} 
                                    className={`flex items-center gap-3 animate-fade-up animate-delay-[${500 + index * 100}ms]`}
                                  >
                                    <div className="flex-shrink-0">
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                    <span className="text-muted-foreground">
                                      {capability}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="pt-4 animate-fade-up animate-delay-[700ms]">
                            <LiquidButton 
                              className="cursor-pointer px-8 py-4 text-lg tracking-wide"
                              onClick={() => window.open("#contact", "_self")}
                            >
                              Start Your Project
                            </LiquidButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout - Centered and Reordered */}
                    <div className="lg:hidden flex flex-col items-center text-center max-w-xs mx-auto space-y-4 px-4">
                      {/* Specialty badge */}
                      <div className="animate-fade-up animate-delay-100">
                        <Badge 
                          variant="outline" 
                          className="text-xs tracking-widest font-bold px-4 py-2 bg-muted/50 text-muted-foreground border-muted-foreground/20"
                        >
                          {service.badge}
                        </Badge>
                      </div>

                      {/* Service name */}
                      <div className="animate-fade-up animate-delay-200">
                        <h3 className="text-3xl font-bold text-foreground">
                          {service.name}
                        </h3>
                      </div>

                      {/* Orb */}
                      <div className="animate-fade-up animate-delay-300 py-2">
                        <div className="w-[240px] h-[240px] mx-auto">
                          <Orb
                            hue={service.hue}
                            hoverIntensity={0.41}
                            rotateOnHover={true}
                            forceHoverState={false}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="animate-fade-up animate-delay-400">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Key Capabilities */}
                      <div className="animate-fade-up animate-delay-500 space-y-3 w-full max-w-xs">
                        <h4 className="text-base font-semibold text-foreground">
                          Key Capabilities
                        </h4>
                        <ul className="space-y-2">
                          {service.capabilities.map((capability, index) => (
                            <li 
                              key={index} 
                              className="flex items-start gap-2 text-left animate-fade-up"
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              </div>
                              <span className="text-xs text-muted-foreground leading-relaxed">
                                {capability}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-2 animate-fade-up animate-delay-600">
                        <LiquidButton 
                          className="cursor-pointer px-8 py-3 text-base tracking-wide"
                          onClick={() => window.open("#contact", "_self")}
                        >
                          Start Your Project
                        </LiquidButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-8 lg:mt-16">
            <button
              aria-label="Previous service"
              className="size-14 rounded-full relative grid place-items-center transition-all duration-200 hover:scale-110 group overflow-hidden backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              onClick={() => embla?.scrollPrev()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              aria-label="Next service"
              className="size-14 rounded-full relative grid place-items-center transition-all duration-200 hover:scale-110 group overflow-hidden backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              onClick={() => embla?.scrollNext()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection; 