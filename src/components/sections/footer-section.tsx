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
      {/* Blue CTA Section */}
      <div className="bg-blue-600 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
        <div className="absolute inset-0 opacity-10">
          <FlickeringGrid
            text=""
            fontSize={60}
            className="h-full w-full"
            squareSize={2}
            gridGap={3}
            color="#ffffff"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-16 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Automate. Simplify. Thrive
          </h2>
          
          <div className="max-w-4xl mx-auto mb-8">
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-colors">
              Book Demo
            </button>
          </div>
          
          <p className="text-blue-100 mb-2">No obligations, no questions asked</p>
          <p className="text-white font-semibold text-lg mb-8">FlipTech Pro</p>
          
          <p className="text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            Deploy specialized AI teams across marketing, operations, product, research, and support. Each team works seamlessly together, handling complex tasks so your human teams can focus on strategic initiatives.
          </p>
          
          {/* Compliance Badges */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <span className="text-xs font-bold text-white">SOC 2</span>
            </div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <span className="text-xs font-bold text-white">SSL</span>
            </div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <span className="text-xs font-bold text-white">GDPR</span>
            </div>
          </div>
          
          {/* Footer Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-left">
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#hero" className="text-blue-100 hover:text-white transition-colors text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#agents" className="text-blue-100 hover:text-white transition-colors text-sm">
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-blue-100 hover:text-white transition-colors text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-blue-100 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-100 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-blue-100 hover:text-white transition-colors text-sm">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Empty column for spacing */}
            <div></div>
          </div>
          
          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm">
              © 2025 FlipTech Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
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