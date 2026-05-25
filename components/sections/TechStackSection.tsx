"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Palette,
  CodesandboxLogo,
  Database,
  Globe,
  ShieldCheck,
  FlowArrow,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const ICONS = [Palette, CodesandboxLogo, Database, Globe, ShieldCheck, FlowArrow];
const COLORS = ["#00FFDD", "#19FF00", "#3700FF", "#19FF00", "#00FFDD", "#3700FF"];

export default function TechStackSection() {
  const t = useTranslations("tech");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  const techItems = t.raw("items") as Array<{ label: string; desc: string }>;

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden scroll-mt-20"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/40 to-transparent origin-left"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-20"
        >
          <span className="font-source-code text-xs tracking-[0.3em] text-warning/60 uppercase">
            {'<'} {t("tag")} {'/>'}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-tomorrow font-bold text-white tracking-tight">
            {t("title")} <span className="text-warning">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-gray-400 font-roboto-flex max-w-xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {techItems.map((item, index) => {
            const Icon = ICONS[index];
            const color = COLORS[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                whileHover={{
                  y: -8,
                  borderColor: color,
                  boxShadow: `0 0 30px ${color}15`,
                }}
                className="group p-8 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  {/* Icono Phosphor Duotone */}
                  <div className="relative">
                    <div
                      className="absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: `${color}20` }}
                    />
                    <div
                      className="relative w-14 h-14 flex items-center justify-center border transition-colors"
                      style={{
                        borderColor: `${color}30`,
                        backgroundColor: `${color}08`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7 transition-colors"
                        style={{ color }}
                        weight="duotone"
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <span className="font-tomorrow text-base font-semibold text-gray-200">
                    {item.label}
                  </span>

                  {/* Descripcion */}
                  <span className="font-source-code text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </span>

                  {/* Linea decorativa */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-6 h-[1px] origin-center"
                    style={{
                      backgroundColor: `${color}30`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decoracion de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warning/5 blur-[200px] rounded-full pointer-events-none" />
    </section>
  );
}
