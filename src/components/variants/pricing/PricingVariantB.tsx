"use client";

import { SectionHeader } from "@/components/section-header";
import { motion } from "motion/react";
import { SavingsCalculator } from "../../ui/SavingCalculator";
import { usePricingContent, useDomainContent } from "@/hooks/useDomainContent";

const PricingVariantB = () => {
  const pricingContent = usePricingContent();
  const { isSmb, isProfessional } = useDomainContent();

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10 py-20 px-6 sm:px-4 md:px-8 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-xl md:text-4xl font-semibold tracking-tight text-center">
          {pricingContent.title}
        </h2>
        <p className="text-muted-foreground text-center font-medium max-w-2xl mx-auto">
          {pricingContent.subtitle}
        </p>
      </SectionHeader>

      {/* Savings Banner for Professional */}
      {isProfessional && pricingContent.savings && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center max-w-md">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            {pricingContent.savings}
          </p>
        </div>
      )}

      {/* ROI Calculator Only - Centered */}
      <div className="w-full max-w-2xl mx-auto">
        <SavingsCalculator className="w-full" />
      </div>

      {/* Call-to-Action */}
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-lg text-muted-foreground mb-6">
          Ready to transform your business with AI?
        </p>
        <motion.button
          className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = "#contact"}
        >
          {pricingContent.cta}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default PricingVariantB;
