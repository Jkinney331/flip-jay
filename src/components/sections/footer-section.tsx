"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDomainContent } from "@/hooks/useDomainContent";
import { LogoInline } from "@/components/ui/logo";
import Link from "next/link";

const FooterSection = () => {
  const tablet = useMediaQuery("(max-width: 1024px)");
  const { config } = useDomainContent();

  return (
    <footer id="footer" className="w-full pb-0">
      {/* White Logo Section */}
      <div className="bg-white w-full h-48 md:h-64 relative z-0">
        <div className="absolute inset-0 mx-6">
          <FlickeringGrid
            text={tablet ? "FlipTech Pro" : "FlipTech Pro"}
            fontSize={tablet ? 70 : 90}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#6B7280"
            maxOpacity={0.1}
            flickerChance={0.05}
          />
        </div>
        
        {/* Centered Logo */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <LogoInline 
            size="xl" 
            className="opacity-20"
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;