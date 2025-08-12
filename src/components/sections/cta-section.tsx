"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { LiquidButton } from "../ui/Liquid-button";
import { useCTAContent, useDomainContent } from "@/hooks/useDomainContent";

const CTASection = () => {
  const ctaContent = useCTAContent();
  const { config } = useDomainContent();

  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="w-full">
        <div className="h-[450px] md:h-[500px] overflow-hidden shadow-xl w-full border border-border rounded-xl bg-secondary relative z-20">
          <Image
            src={ctaContent.backgroundImage}
            alt="FlipTech Pro call-to-action background featuring AI technology and automation themes"
            className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
            fill
            loading="lazy"
          />
          {/* Main CTA Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16">
            <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-medium tracking-tighter max-w-xs sm:max-w-sm md:max-w-xl text-center px-4">
              {ctaContent.title}
            </h1>
            
            {ctaContent.subtitle && (
              <p className="text-white/90 text-sm sm:text-base md:text-lg mt-4 text-center max-w-lg px-4">
                {ctaContent.subtitle}
              </p>
            )}
            
            <div className="mt-6 flex flex-col items-center justify-center gap-2">
              <LiquidButton 
                onClick={() => window.location.href = ctaContent.button.href}
                className="text-blue-600 font-semibold text-lg h-12 w-fit px-8 py-3 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              >
                {ctaContent.button.text}
              </LiquidButton>
              <span className="text-white text-sm px-4 text-center">{ctaContent.subtext}</span>
            </div>
          </div>

          {/* Footer Content */}
          <div className="w-full absolute bottom-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 text-center bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <Link href="/" className="flex items-center gap-2 justify-center">
              <p className="text-lg sm:text-xl font-semibold text-white">{ctaContent.companyName}</p>
            </Link>

            <p className="tracking-tight text-white font-medium mt-2 sm:mt-4 max-w-sm sm:max-w-md md:max-w-xl text-sm sm:text-base px-2">
              Deploy specialized AI teams across marketing, operations, product, research, and support.
              Each team works seamlessly together, handling complex tasks so your human teams can focus on strategic initiatives.
            </p>

            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 dark:hidden">
              <Icons.soc2 className="size-8 sm:size-10 md:size-12" />
              <Icons.hipaa className="size-8 sm:size-10 md:size-12" />
              <Icons.gdpr className="size-8 sm:size-10 md:size-12" />
            </div>

            <div className="dark:flex items-center justify-center gap-2 hidden mt-4 sm:mt-6">
              <Icons.soc2Dark className="size-8 sm:size-10 md:size-12" />
              <Icons.hipaaDark className="size-8 sm:size-10 md:size-12" />
              <Icons.gdprDark className="size-8 sm:size-10 md:size-12" />
            </div>
            
            <p className="text-xs sm:text-sm font-medium text-white mt-2">© 2025 FlipTech Pro. All rights reserved.</p>
            <Link
              href="/privacy"
              className="text-xs sm:text-sm font-medium text-white mt-2 sm:mt-4 md:mt-6 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;