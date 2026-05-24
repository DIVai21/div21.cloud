"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Stack", href: "#techstack" },
  { label: "Contacto", href: "#contacto" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="h-10 md:h-12 text-success group-hover:text-success/80 transition-colors duration-300" />
          <span className="font-tomorrow text-lg md:text-xl font-semibold text-success hidden sm:inline tracking-tight">
            DIV21<span className="text-white/60">.cloud</span>
          </span>
        </Link>

        {/* Navegacion */}
        <nav className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-source-code text-xs tracking-wider text-gray-400 hover:text-success transition-colors bg-transparent border-none cursor-pointer uppercase"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
