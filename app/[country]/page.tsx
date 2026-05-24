"use client";

import { br } from "@/lib/i18n/dictionaries/br";
import { bo } from "@/lib/i18n/dictionaries/bo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import FormSection from "@/components/sections/FormSection";

type Props = {
  params: { country: string };
};

export default function Home({ params: { country } }: Props) {
  const dict = country === "br" ? br : bo;

  return (
    <main className="min-h-screen flex flex-col bg-primary text-white overflow-x-hidden relative">
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
  );
}
