"use client";
import { br } from "@/lib/i18n/dictionaries/br";
import { bo } from "@/lib/i18n/dictionaries/bo";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  // Selección simple de diccionario
  const dict = locale === "br" ? br : bo;

  return (
    <main className="min-h-screen flex flex-col bg-primary text-white overflow-x-hidden relative">
      
      {/* 1. Logo Verde Top-Left 50px */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-8 left-12 z-50 pointer-events-none" // left-12 es aprox 48px
      >
        <Logo className="h-16 text-success" /> 
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 relative">
        <div className="max-w-5xl w-full flex flex-col items-center gap-10 z-10 text-center">
          
          {/* Título Gigante "Source Code Pro" - Tecnológico */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-source-code font-bold tracking-tighter leading-tight text-white mb-4"
          >
            {dict.hero.title}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-success inline-block ml-2"
            >_</motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-400 max-w-2xl font-roboto-flex leading-relaxed"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(25, 255, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-10 py-5 bg-accent text-white rounded-none border border-success/30 hover:border-success font-source-code uppercase tracking-widest text-sm font-bold transition-colors"
          >
            &gt; {dict.hero.cta}
          </motion.button>
        </div>

        {/* Elemento decorativo de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/40 via-primary to-primary pointer-events-none -z-0" />
      </section>

      {/* Benefits Preview - Scroll Animation */}
      <section className="py-24 px-8 bg-primary relative z-10 w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {dict.benefits.items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, borderColor: "#19FF00" }}
              className="p-10 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all group min-h-[200px] flex items-center justify-center text-center"
            >
              <h3 className="text-2xl font-source-code font-bold text-gray-200 group-hover:text-success transition-colors">
                &lt;{item} /&gt;
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-gray-600 font-source-code">
        SYSTEM_LOCALE: <span className="text-warning">{locale.toUpperCase()}</span>
      </footer>
    </main>
  );
}
