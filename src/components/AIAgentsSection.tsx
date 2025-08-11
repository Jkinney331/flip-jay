"use client";

import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Cog,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Orb from "@/components/ui/Orb";
import { LiquidButton } from "@/components/ui/Liquid-button";

interface Agent {
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

const agentData: Agent[] = [
  {
    id: 1,
    name: "Nancy",
    role: "Natural Language Processing Specialist",
    badge: "NLP SPECIALIST",
    description: "Advanced natural language processing that transforms unstructured communication into actionable business insights with precision and context awareness.",
    capabilities: [
      "Sentiment Analysis & Emotion Detection",
      "Document Processing & Extraction",
      "Conversation Intelligence",
      "Content Classification & Tagging"
    ],
    icon: MessageSquare,
    specialty: "NLP",
    hue: 280, // Purple/Pink for NLP
  },
  {
    id: 2,
    name: "Ellis",
    role: "Predictive Analytics Expert", 
    badge: "ANALYTICS EXPERT",
    description: "Sophisticated predictive modeling that identifies patterns, forecasts trends, and provides data-driven recommendations before opportunities emerge.",
    capabilities: [
      "Predictive Forecasting & Modeling",
      "Customer Behavior Analysis",
      "Market Trend Detection",
      "Risk Assessment & Mitigation"
    ],
    icon: TrendingUp,
    specialty: "Analytics",
    hue: 200, // Blue for Analytics
  },
  {
    id: 3,
    name: "Justin",
    role: "Intelligent Automation Architect",
    badge: "AUTOMATION ARCHITECT",
    description: "Intelligent automation that streamlines complex workflows, eliminates manual bottlenecks, and optimizes operational efficiency across systems.",
    capabilities: [
      "Workflow Optimization & Design",
      "Process Automation & Integration",
      "Quality Control & Monitoring",
      "Performance Analytics & Reporting"
    ],
    icon: Cog,
    specialty: "Automation",
    hue: 40, // Orange for Automation
  },
  {
    id: 4,
    name: "Dan",
    role: "Social Media Strategist",
    badge: "SOCIAL STRATEGIST",
    description: "Strategic social media management that amplifies brand voice, engages audiences, and drives meaningful connections across all digital channels.",
    capabilities: [
      "Content Strategy & Planning",
      "Audience Engagement & Growth",
      "Brand Voice Consistency",
      "Performance Tracking & Optimization"
    ],
    icon: MessageSquare,
    specialty: "Social",
    hue: 150, // Green for Social
  },
  {
    id: 5,
    name: "Chloe",
    role: "Project Operations Manager",
    badge: "OPERATIONS MANAGER",
    description: "Comprehensive project operations management that ensures seamless execution, resource optimization, and timely delivery of business objectives.",
    capabilities: [
      "Project Planning & Coordination",
      "Resource Allocation & Management",
      "Timeline Tracking & Optimization",
      "Stakeholder Communication"
    ],
    icon: CheckCircle,
    specialty: "Operations",
    hue: 260, // Indigo for Operations
  },
];

function AIAgentsSection() {
  // const [selectedId, setSelectedId] = useState<number | null>(null);

  const [viewportRef, embla] = useEmblaCarousel({ align: "center", loop: true });

  const palette = useMemo(
    () => ({
      NLP: "from-fuchsia-500 to-pink-500",
      Analytics: "from-blue-500 to-cyan-500",
      Automation: "from-amber-400 to-orange-500",
      Social: "from-emerald-500 to-green-400",
      Operations: "from-indigo-500 to-purple-500",
      Default: "from-slate-300 to-slate-500",
    }),
    []
  );

  return (
    <section id="agents" className="py-16 lg:py-32 dark:bg-zinc-900 bg-white">
      <div className="mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Meet Your Specialized AI Agents
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Every agent comes with an intuitive dashboard to fine-tune, train, and optimize performance.
          </p>
        </div>

        {/* Full-width carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="flex">
              {agentData.map((agent) => {
                // const Icon = agent.icon;
                const gradient = palette[agent.specialty as keyof typeof palette] || palette.Default;

                return (
                  <div key={agent.id} className="flex-[0_0_100%] px-4">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
                      {/* Large Orb */}
                      <div className="flex justify-end order-1">
                        <div className="w-[600px] h-[600px]">
                          <Orb
                            hue={agent.hue}
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
                              {agent.badge}
                            </Badge>
                          </div>

                          {/* Agent name */}
                          <div className="animate-fade-up animate-delay-200">
                            <h3 className="text-6xl font-bold text-foreground">
                              {agent.name}
                            </h3>
                          </div>

                          {/* Description */}
                          <div className="animate-fade-up animate-delay-300">
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                              {agent.description}
                            </p>
                          </div>

                          {/* Key Capabilities */}
                          <div className="animate-fade-up animate-delay-[400ms]">
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-foreground">
                                Key Capabilities
                              </h4>
                              <ul className="space-y-3">
                                {agent.capabilities.map((capability, index) => (
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
                          <div className="pt-4 animate-fade-up animate-delay-[800ms]">
                            <LiquidButton 
                              className="cursor-pointer px-8 py-4 text-lg tracking-wide"
                              onClick={() => window.open("#contact", "_self")}
                            >
                              Book Demo
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
                          {agent.badge}
                        </Badge>
                      </div>

                      {/* Agent name */}
                      <div className="animate-fade-up animate-delay-200">
                        <h3 className="text-3xl font-bold text-foreground">
                          {agent.name}
                        </h3>
                      </div>

                      {/* Orb */}
                      <div className="animate-fade-up animate-delay-300 py-2">
                        <div className="w-[240px] h-[240px] mx-auto">
                          <Orb
                            hue={agent.hue}
                            hoverIntensity={0.41}
                            rotateOnHover={true}
                            forceHoverState={false}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="animate-fade-up animate-delay-400">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {agent.description}
                        </p>
                      </div>

                      {/* Key Capabilities */}
                      <div className="animate-fade-up animate-delay-500 space-y-3 w-full max-w-xs">
                        <h4 className="text-base font-semibold text-foreground">
                          Key Capabilities
                        </h4>
                        <ul className="space-y-2">
                          {agent.capabilities.map((capability, index) => (
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
                          Book Demo
                        </LiquidButton>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Custom agent slide */}
              <div className="flex-[0_0_100%] px-4">
                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
                  {/* Large Orb */}
                  <div className="flex justify-end order-1">
                    <div className="w-[600px] h-[600px]">
                      <Orb
                        hue={120}
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
                          CUSTOM SOLUTION
                        </Badge>
                      </div>

                      {/* Agent name */}
                      <div className="animate-fade-up animate-delay-200">
                        <h3 className="text-6xl font-bold text-foreground">
                          Your Agent
                        </h3>
                      </div>

                      {/* Description */}
                      <div className="animate-fade-up animate-delay-300">
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                          We create bespoke AI agents tailored specifically to your business needs, integrating seamlessly with your existing workflows and systems.
                        </p>
                      </div>

                      {/* Key Capabilities */}
                      <div className="animate-fade-up animate-delay-[400ms]">
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-foreground">
                            What You Get
                          </h4>
                          <ul className="space-y-3">
                            {["Custom AI Agent Development", "Full Integration & Training", "Ongoing Support & Optimization", "Dedicated Success Manager"].map((capability, index) => (
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
                      <div className="pt-4 animate-fade-up animate-delay-[800ms]">
                        <LiquidButton 
                          className="cursor-pointer px-8 py-4 text-lg tracking-wide"
                          onClick={() => window.open("#contact", "_self")}
                        >
                          Book Demo
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
                      CUSTOM SOLUTION
                    </Badge>
                  </div>

                  {/* Agent name */}
                  <div className="animate-fade-up animate-delay-200">
                    <h3 className="text-4xl font-bold text-foreground">
                      Your Agent
                    </h3>
                  </div>

                  {/* Orb */}
                  <div className="animate-fade-up animate-delay-300 py-4">
                    <div className="w-[280px] h-[280px] mx-auto">
                      <Orb
                        hue={120}
                        hoverIntensity={0.41}
                        rotateOnHover={true}
                        forceHoverState={false}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="animate-fade-up animate-delay-400">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      We create bespoke AI agents tailored specifically to your business needs, integrating seamlessly with your existing workflows and systems.
                    </p>
                  </div>

                  {/* Key Capabilities */}
                  <div className="animate-fade-up animate-delay-500 space-y-4 w-full">
                    <h4 className="text-lg font-semibold text-foreground">
                      What You Get
                    </h4>
                    <ul className="space-y-2">
                      {["Custom AI Agent Development", "Full Integration & Training", "Ongoing Support & Optimization", "Dedicated Success Manager"].map((capability, index) => (
                        <li 
                          key={index} 
                          className="flex items-center gap-3 text-left animate-fade-up"
                        >
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">
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
                      Book Demo
                    </LiquidButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-8 lg:mt-16">
            <button
              aria-label="Previous agent"
              className="size-14 rounded-full bg-[#f5f5f7] text-[#1d1d1f] grid place-items-center transition-all duration-200 hover:scale-110 hover:bg-[#e8e8ed] shadow-lg"
              onClick={() => embla?.scrollPrev()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              aria-label="Next agent"
              className="size-14 rounded-full bg-[#f5f5f7] text-[#1d1d1f] grid place-items-center transition-all duration-200 hover:scale-110 hover:bg-[#e8e8ed] shadow-lg"
              onClick={() => embla?.scrollNext()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIAgentsSection; 