"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TITLE_TEXT = "DIV21 CLOUD";
const SUBTITLE_TEXT =
  "Arquitectura digital de alto rendimiento. Diseñamos y escalamos plataformas de software a nivel empresarial.";
const CTA_TEXT = "Iniciar despliegue";

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradiente de fondo estatico */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/40 via-primary to-primary pointer-events-none" />

      {/* Linea de carga superior */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-success/60 origin-left"
      />

      {/* Contenido principal con parallax de salida */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 max-w-5xl w-full flex flex-col items-center gap-8 px-6 text-center"
      >
        {/* Etiqueta tecnica */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-source-code text-xs tracking-[0.3em] text-success/60 uppercase"
        >
          {'<'} Sistema {'/>'}
        </motion.span>

        {/* Titulo con animacion palabra por palabra */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-tomorrow font-bold tracking-tight leading-tight text-white">
          <WordReveal text={TITLE_TEXT} />
        </h1>

        {/* Linea divisoria animada */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
          className="w-32 h-[1px] bg-success/40 origin-center"
        />

        {/* Subtitulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl font-roboto-flex leading-relaxed"
        >
          {SUBTITLE_TEXT}
        </motion.p>

        {/* Boton CTA - Scroll suave a servicios */}
        <motion.button
          onClick={() => {
            document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(25, 255, 0, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-4 bg-success/10 border border-success/30 text-success font-source-code text-sm tracking-widest uppercase hover:bg-success/20 transition-all cursor-pointer"
        >
          {'<'} {CTA_TEXT} {'/>'}
        </motion.button>

        {/* Badge de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-source-code text-[10px] tracking-[0.2em] text-gray-500 uppercase"
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-8 bg-success/40"
          />
        </motion.div>
      </motion.div>

    </section>
  );
}
