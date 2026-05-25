"use client";

import { motion } from "framer-motion";
import {
  GithubLogo,
  XLogo,
  LinkedinLogo,
  Envelope,
} from "@phosphor-icons/react";
import Logo from "@/components/Logo";
import { useTranslations } from "next-intl";

const SOCIAL_LINKS = [
  { icon: GithubLogo, href: "#", label: "GitHub" },
  { icon: XLogo, href: "#", label: "X (Twitter)" },
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
  { icon: Envelope, href: "#", label: "Email" },
];

export default function Footer() {
  const t = useTranslations("footer");

  const footerGroups = t.raw("groups") as Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-success/40 to-transparent origin-left"
      />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Columna 1: Logo y descripcion */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <Logo className="h-8 text-success" />
              <span className="font-tomorrow text-lg font-semibold text-success">
                DIV21<span className="text-white/60">.cloud</span>
              </span>
            </motion.div>
            <p className="font-roboto-flex text-sm text-gray-500 leading-relaxed">
              {t("description")}
            </p>

            {/* Redes sociales */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-success/40 hover:bg-success/5 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-gray-400 hover:text-success transition-colors" weight="duotone" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Columnas de links */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-source-code text-[10px] tracking-[0.2em] text-success/60 uppercase mb-6"
              >
                {'<'} {group.title} {'/>'}
              </motion.h4>
              <ul className="space-y-3">
                {group.links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="font-roboto-flex text-sm text-gray-500 hover:text-success transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barra inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span className="font-source-code text-[10px] tracking-[0.2em] text-gray-600 uppercase">
            {'<'} {t("copyright", { year: new Date().getFullYear() })} {'/>'}
          </span>
        </motion.div>
      </div>

      {/* Decoracion de fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-success/3 blur-[150px] rounded-full pointer-events-none" />
    </footer>
  );
}
