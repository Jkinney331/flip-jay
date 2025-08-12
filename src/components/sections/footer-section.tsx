"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDomainContent } from "@/hooks/useDomainContent";
import Link from "next/link";

const FooterSection = () => {
  const tablet = useMediaQuery("(max-width: 1024px)");
  const { config } = useDomainContent();

  return (
    <footer id="footer" className="w-full pb-0 bg-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {config.brand || "FlipTech Pro"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
              Transform your business with cutting-edge AI solutions, delivered with unmatched speed and expertise. 
              Join hundreds of companies already growing with AI.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 {config.brand || "FlipTech Pro"}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#agents" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative Background - Clean and Non-Overlapping */}
      <div className="w-full h-32 md:h-40 relative z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-background z-10" />
        <div className="absolute inset-0 mx-6">
          <FlickeringGrid
            text={tablet ? "AI" : "AI SOLUTIONS"}
            fontSize={tablet ? 40 : 60}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#6B7280"
            maxOpacity={0.1}
            flickerChance={0.05}
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;