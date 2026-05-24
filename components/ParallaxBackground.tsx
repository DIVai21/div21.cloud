"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll();

  // Capas del grid que se mueven a diferentes velocidades
  const gridY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const gridY2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const gridY3 = useTransform(scrollYProgress, [0, 1], [0, -550]);

  // Opacidad dinámica para dar sensación de profundidad
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.15, 0.18]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.10, 0.12]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.07, 0.09]);

  // Orbes de luz con parallax
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-large-s" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M 120 0 L 0 0 0 120" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-large-s)" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Capa 1 - Grid grande, movimiento lento */}
      <motion.div style={{ y: gridY1, opacity: opacity1 }} className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-large" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-large)" />
        </svg>
      </motion.div>

      {/* Capa 2 - Grid mediano, velocidad media */}
      <motion.div style={{ y: gridY2, opacity: opacity2 }} className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-medium" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-medium)" />
        </svg>
      </motion.div>

      {/* Capa 3 - Grid pequeño, movimiento rápido */}
      <motion.div style={{ y: gridY3, opacity: opacity3 }} className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-small" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-small)" />
        </svg>
      </motion.div>

      {/* Puntos de intersección del grid */}
      <motion.div style={{ y: gridY2 }} className="absolute inset-0 opacity-[0.15]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="1.5" fill="#19FF00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </motion.div>

      {/* Orbes de luz con parallax */}
      <motion.div style={{ y: orbY1 }} className="absolute -top-40 -left-40 w-96 h-96 bg-success/10 blur-[150px] rounded-full" />
      <motion.div style={{ y: orbY2 }} className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-accent/10 blur-[180px] rounded-full" />
    </div>
  );
}
