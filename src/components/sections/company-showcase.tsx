"use client";

// import { siteConfig } from "@/lib/config";
import LogoCarousel from "./logocarousal";

const CompanyShowcase = () =>{
  return (
    <section
      id="company"
      className="flex flex-col items-center justify-center gap-10 py-10 pt-24 w-full relative px-6"
    >
      <p className="text-xl md:text-2xl font-bold text-muted-foreground text-center">
        Platforms I build on
      </p>

      {/* Only the new auto-scroll carousel */}
      <LogoCarousel />
    </section>
  );
}
export default CompanyShowcase;