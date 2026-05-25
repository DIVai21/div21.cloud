"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cpu,
  ShieldCheck,
  Network,
  Cloud,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const ICONS = [Cpu, ShieldCheck, Network, Cloud];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
};

export default function ServicesSection() {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const services = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden scroll-mt-20"
    >
      {/* Linea decorativa superior animada */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-success/40 to-transparent origin-left"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Encabezado de seccion */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-20"
        >
          <span className="font-source-code text-xs tracking-[0.3em] text-success/60 uppercase">
            {'<'} {t("tag")} {'/>'}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-tomorrow font-bold text-white tracking-tight">
            {t("title")}{" "}
            <span className="text-success">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-gray-400 font-roboto-flex max-w-xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Grid de servicios con efecto cascada */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  borderColor: "#19FF00",
                  boxShadow: "0 0 30px rgba(25, 255, 0, 0.1)",
                }}
                className="group p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Icono Phosphor Duotone */}
                  <div className="shrink-0 w-14 h-14 flex items-center justify-center border border-success/20 bg-success/5 group-hover:bg-success/10 transition-colors">
                    <Icon className="w-7 h-7 text-success" weight="duotone" />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-tomorrow font-semibold text-white group-hover:text-success transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-gray-400 font-roboto-flex leading-relaxed">
                      {service.description}
                    </p>

                    {/* Linea decorativa inferior */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="mt-4 w-16 h-[1px] bg-success/30 origin-left"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Decoracion de fondo */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-success/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
