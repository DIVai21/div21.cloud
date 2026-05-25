"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBackground from "@/components/ParallaxBackground";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import FormSection from "@/components/sections/FormSection";

export default function Home() {
  return (
    <>
      <ParallaxBackground />
      <main className="min-h-screen flex flex-col text-white overflow-x-hidden relative">
        <Header />

        <div className="pt-20">
          <HeroSection />

          <ScrollReveal>
            <ServicesSection />
          </ScrollReveal>

          <ScrollReveal>
            <TechStackSection />
          </ScrollReveal>

          <FormSection />
        </div>

        <Footer />
      </main>
    </>
  );
}
