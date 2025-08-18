'use client'
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { useDomainContent } from "@/hooks/useDomainContent";

interface Step {
  icon: React.ReactNode;
  day: string;
  title: string;
  desc: string;
}

// Get process steps based on domain (30-day for teams, 14-day for agents)
const getProcessSteps = (config: any): Step[] => {
  return [
    {
      icon: <Image src="/bulb.svg" alt="Phone icon representing discovery call phase" width={24} height={24} className="w-6 h-6" />,
      day: "Discovery Call",
      title: "Discovery Call",
      desc: "I map needs, timeline, and budget.",
    },
    {
      icon: <Image src="/calender.svg" alt="Document icon representing detailed estimate phase" width={24} height={24} className="w-6 h-6" />,
      day: "Detailed Estimate",
      title: "Detailed Estimate",
      desc: "Hours or fixed price with clear deliverables.",
    },
    {
      icon: <Image src="/code.svg" alt="Rocket icon representing kickoff and development phase" width={24} height={24} className="w-6 h-6" />,
      day: "Kickoff & Development",
      title: "Kickoff & Development",
      desc: "I start immediately; you get regular check-ins.",
    },
    {
      icon: <Image src="/testing.svg" alt="Refresh icon representing review and iterate phase" width={28} height={28} className="w-6 h-6" />,
      day: "Review & Iterate",
      title: "Review & Iterate",
      desc: "Your feedback sharpens the result; I refine until you're thrilled.",
    },
    {
      icon: <Image src="/rocket.svg" alt="Support icon representing launch and support phase" width={24} height={24} className="w-6 h-6" />,
      day: "Launch & Support",
      title: "Launch & Support",
      desc: "Go live confidently. I provide post-launch support.",
    },
  ];
};

export default function FlipTechProcess() {
  const { config } = useDomainContent();
  const steps = getProcessSteps(config);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Restart animation each time the section is in view
            let start = 0;
            const total = 100;
            const duration = 2000;
            const interval = 20;
            const increment = (interval / duration) * total;

            const animate = () => {
              start += increment;
              if (start >= total) start = total;
              setProgress(start);
              if (start < total) {
                setTimeout(animate, interval);
              }
            };

            setProgress(0); // Reset before animating
            animate();
          }
        });
      },
      { threshold: 0.5 } // trigger when 50% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 md:px-8 py-16 text-center bg-white dark:bg-[#18181B] transition-colors duration-300"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
        How I work
      </h2>
      <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 px-2">
        Simple, transparent, designed around your needs
      </p>

      <div className="relative mt-12">
        {/* Animated Gradient Line - hidden on mobile/tablet */}
        <div className="hidden md:block absolute left-0 top-[86px] w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-300"
          />
        </div>

        {/* Steps */}
        <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-6">
          {steps.map((step, index) => {
            const threshold = ((index + 1) / steps.length) * 100;
            const isActive = progress >= threshold;

            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className={`text-xl rounded-full p-2 md:p-3 shadow-md transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                  }`}
                >
                  {step.icon}
                </div>
                <p className="text-xs md:text-sm text-emerald-400 font-semibold mt-2">{step.day}</p>
                <h3 className="mt-3 text-base md:text-lg font-bold text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-[220px] text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
