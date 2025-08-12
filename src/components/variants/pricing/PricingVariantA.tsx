"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { LiquidButton } from "../../ui/Liquid-button";
import { Shield, Users, Star, TrendingUp, Clock, DollarSign } from "lucide-react";
import { SavingsCalculator } from "../../ui/SavingCalculator";
import { pricingVariants } from "@/lib/variants";
import { useConversionTracking } from "@/hooks/useVariant";

const PricingVariantA = () => {
  const config = pricingVariants.variant_a;
  const tier = siteConfig.pricing.pricingItems[0];
  const { trackGlobalConversion } = useConversionTracking();

  const PriceDisplay = ({ price }: { price: string | number }) => (
    <motion.span
      key={price}
      className="text-5xl font-bold text-center"
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      ${price}
    </motion.span>
  );

  const handleCTAClick = () => {
    trackGlobalConversion('pricing_cta_click', 'pricing_section', 'variant_a');
  };

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10 py-20 px-6 sm:px-4 md:px-8 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-xl md:text-4xl font-semibold tracking-tight text-center">
          {config.title}
        </h2>
        <p className="text-muted-foreground text-center font-medium max-w-2xl mx-auto">
          {config.subtitle}
        </p>
      </SectionHeader>

      {/* Value Props Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-8">
        {config.valueProps.map((prop, index) => (
          <div key={index} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">{prop}</p>
          </div>
        ))}
      </div>

      {/* Row 1 - Enhanced Price card + Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        {/* Enhanced Pricing Card */}
        <div className="w-full rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-zinc-900/50 backdrop-blur-md p-8 shadow-2xl relative">
          {/* Best Value Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              {config.badge}
            </div>
          </div>

          <div className="mb-6 flex flex-col items-center pt-4">
            <div className="flex items-baseline gap-2">
              <PriceDisplay price={tier.price} />
              <span className="text-lg text-muted-foreground">/project</span>
            </div>
            <p className="text-base text-muted-foreground mt-2 text-center font-bold">{tier.name}</p>
            <p className="text-sm text-muted-foreground mt-2 text-center">{tier.description}</p>
            
            {/* ROI Highlight */}
            <div className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg">
              <p className="text-sm font-bold">Typical ROI: $285,000 in 90 days</p>
            </div>
          </div>

          {/* Enhanced Features List */}
          <ul className="space-y-3 text-sm mb-8 flex flex-col items-start justify-start">
            {config.features.map((feature, index) => (
              <li key={feature} className="flex items-start gap-3 text-left w-full">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L4.5 7.5L10 2"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Enhanced CTA Button */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <LiquidButton 
              className="cursor-pointer w-full text-lg py-4"
              onClick={handleCTAClick}
            >
              Book Your Demo Today
            </LiquidButton>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Only 3 spots left this month</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600">
                <Shield className="w-4 h-4" />
                <span>30-day guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Calculator */}
        <div className="mx-auto w-full max-w-md rounded-xl border border-border dark:border-white/10 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-6 shadow-lg">
          <SavingsCalculator />
        </div>
      </div>

      {/* Enhanced Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full max-w-5xl">
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 text-center">
          <Shield className="w-6 h-6 mx-auto text-green-600 mb-2" />
          <p className="text-xs font-bold">30-Day Guarantee</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 text-center">
          <Users className="w-6 h-6 mx-auto text-blue-600 mb-2" />
          <p className="text-xs font-bold">500+ Clients</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700 text-center">
          <Star className="w-6 h-6 mx-auto text-yellow-600 mb-2" />
          <p className="text-xs font-bold">4.9/5 Rating</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 text-center">
          <TrendingUp className="w-6 h-6 mx-auto text-purple-600 mb-2" />
          <p className="text-xs font-bold">300% Avg ROI</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700 text-center">
          <Clock className="w-6 h-6 mx-auto text-orange-600 mb-2" />
          <p className="text-xs font-bold">14 Days Deploy</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700 text-center">
          <DollarSign className="w-6 h-6 mx-auto text-emerald-600 mb-2" />
          <p className="text-xs font-bold">Save $200K+</p>
        </div>
      </div>
    </section>
  );
};

export default PricingVariantA;
