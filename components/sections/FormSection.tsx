"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PaperPlaneRight } from "@phosphor-icons/react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_CONFIG,
  isEmailJSConfigured,
} from "@/lib/emailjs/config";

// ============================================================
// Rate Limiting - Control de envios del formulario
// ============================================================
// Almacena en localStorage para persistir entre sesiones:
// - Intento 1: envio inmediato
// - Intento 2: espera 5 min desde el intento 1
// - Intento 3: espera 10 min desde el intento 2
// - Intento 4+: bloqueado 24h desde el primer intento
// ============================================================

const STORAGE_KEY = "div21_contact_attempts";
const COOLDOWN_1 = 5 * 60 * 1000;    // 5 minutos
const COOLDOWN_2 = 10 * 60 * 1000;   // 10 minutos
const COOLDOWN_DAY = 24 * 60 * 60 * 1000; // 24 horas
const MAX_ATTEMPTS = 3;

interface AttemptData {
  count: number;
  timestamps: number[];
}

function getAttempts(): AttemptData {
  if (typeof window === "undefined") return { count: 0, timestamps: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignorar
  }
  return { count: 0, timestamps: [] };
}

function saveAttempts(data: AttemptData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getRemainingTime(data: AttemptData): number | null {
  const now = Date.now();

  // Si pasaron 24h desde el primer intento, reseteamos
  if (data.timestamps[0] && now - data.timestamps[0] > COOLDOWN_DAY) {
    return 0; // listo para resetear
  }

  if (data.count === 0) return 0; // envio inmediato

  if (data.count === 1) {
    const elapsed = now - data.timestamps[0];
    if (elapsed < COOLDOWN_1) return COOLDOWN_1 - elapsed;
    return 0;
  }

  if (data.count === 2) {
    const elapsed = now - data.timestamps[1];
    if (elapsed < COOLDOWN_2) return COOLDOWN_2 - elapsed;
    return 0;
  }

  // count >= 3: bloqueado hasta 24h desde el primer intento
  return data.timestamps[0] + COOLDOWN_DAY - now;
}

function formatTime(ms: number): string {
  if (ms <= 0) return "0 seg";
  const totalSec = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  if (hours > 0) return `${hours}h ${minutes}min`;
  if (minutes > 0) return `${minutes}min ${seconds}seg`;
  return `${seconds}seg`;
}

type FormStatus = "idle" | "loading" | "success" | "error" | "rate-limited";

export default function FormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const formY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  // Verificar estado al montar y actualizar contador regresivo
  useEffect(() => {
    checkRateLimit();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkRateLimit() {
    const data = getAttempts();
    const remaining = getRemainingTime(data);

    if (remaining === null) {
      // Error inesperado
      return;
    }

    if (remaining === 0 && data.timestamps[0] && data.count >= MAX_ATTEMPTS) {
      // Se cumplieron 24h, reseteamos
      const reset: AttemptData = { count: 0, timestamps: [] };
      saveAttempts(reset);
      setAttemptsLeft(MAX_ATTEMPTS);
      setRemainingTime(null);
      return;
    }

    if (remaining > 0) {
      setStatus("rate-limited");
      setRemainingTime(remaining);
      setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - data.count));

      // Actualizar cada segundo
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const updated = getAttempts();
        const rem = getRemainingTime(updated);
        if (rem && rem > 0) {
          setRemainingTime(rem);
        } else {
          // Ya paso el tiempo de espera
          if (timerRef.current) clearInterval(timerRef.current);
          setStatus("idle");
          setRemainingTime(null);
          setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - updated.count));
        }
      }, 1000);
    } else {
      setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - data.count));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. Verificar rate limiting
    const data = getAttempts();
    const remaining = getRemainingTime(data);

    if (remaining === null) return;

    if (remaining > 0) {
      setStatus("rate-limited");
      setRemainingTime(remaining);
      return;
    }

    // Si ya se cumplieron 24h, reseteamos
    if (data.timestamps[0] && data.count >= MAX_ATTEMPTS) {
      const reset: AttemptData = { count: 0, timestamps: [] };
      saveAttempts(reset);
    }

    // 2. Verificar configuracion de EmailJS
    if (!isEmailJSConfigured()) {
      setStatus("error");
      setErrorMsg(
        "EmailJS no configurado. Agrega las variables en .env.local"
      );
      return;
    }

    if (!formRef.current) return;

    // 3. Enviar email
    setStatus("loading");

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );

      // 4. Registrar intento exitoso
      const now = Date.now();
      const updated: AttemptData = {
        count: data.count + 1,
        timestamps: [...data.timestamps, now],
      };
      saveAttempts(updated);

      setStatus("success");
      setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - updated.count));
      formRef.current.reset();

      // Resetear el estado success a los 5 segundos
      setTimeout(() => {
        setStatus("idle");
        checkRateLimit();
      }, 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg("Error al enviar el mensaje. Intenta de nuevo.");
    }
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative py-32 px-6 bg-primary overflow-hidden scroll-mt-20"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-success/40 to-transparent origin-left"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex gap-12 lg:gap-20">
          {/* Columna izquierda - Informacion */}
          <div className="hidden lg:flex flex-col justify-center shrink-0 max-w-xs">
            <h3 className="font-tomorrow text-2xl font-bold text-white mb-4">
              Trabajemos juntos
            </h3>
            <p className="font-roboto-flex text-sm text-gray-400 leading-relaxed">
              Completa el formulario y nuestro equipo te contactara
              para coordinar los detalles de tu proyecto.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { label: "Email", value: "inbox.div21@gmail.com" },
                { label: "Ubicacion", value: "Santa Cruz, Bolivia" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-source-code text-[10px] tracking-[0.2em] text-success/60 uppercase">
                    {'<'} {item.label} {'/>'}
                  </span>
                  <p className="font-roboto-flex text-sm text-gray-300 mt-1">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <motion.div style={{ y: formY }} className="flex-1 max-w-xl">
            <div className="mb-10">
              <span className="font-source-code text-xs tracking-[0.3em] text-success/60 uppercase">
                {'<'} Contacto {'/>'}
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-tomorrow font-bold text-white tracking-tight">
                Inicia tu <span className="text-success">despliegue</span>
              </h2>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block font-source-code text-xs tracking-wider text-gray-300 mb-2 uppercase">
                  {'<'} Nombre completo {'/>'}
                </label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Ingrese su nombre"
                  required
                  disabled={status === "rate-limited"}
                  className="w-full h-12 bg-white/5 border border-white/10 px-4 text-white font-roboto-flex text-sm placeholder:text-gray-600 focus:outline-none focus:border-success focus:ring-2 focus:ring-success/30 transition-all disabled:opacity-30"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-source-code text-xs tracking-wider text-gray-300 mb-2 uppercase">
                  {'<'} Email corporativo {'/>'}
                </label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="usuario@empresa.com"
                  required
                  disabled={status === "rate-limited"}
                  className="w-full h-12 bg-white/5 border border-white/10 px-4 text-white font-roboto-flex text-sm placeholder:text-gray-600 focus:outline-none focus:border-success focus:ring-2 focus:ring-success/30 transition-all disabled:opacity-30"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block font-source-code text-xs tracking-wider text-gray-300 mb-2 uppercase">
                  {'<'} Mensaje {'/>'}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Describa su proyecto"
                  required
                  disabled={status === "rate-limited"}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-roboto-flex text-sm placeholder:text-gray-600 focus:outline-none focus:border-success focus:ring-2 focus:ring-success/30 transition-all resize-none disabled:opacity-30"
                />
              </div>

              {/* Feedback: Rate Limited */}
              {status === "rate-limited" && remainingTime !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-warning/30 bg-warning/10"
                >
                  <span className="font-source-code text-xs tracking-wider text-warning uppercase">
                    {'<'} Limite de mensajes alcanzado {'/>'}
                  </span>
                  <p className="font-roboto-flex text-sm text-gray-300 mt-2">
                    {attemptsLeft <= 0
                      ? `Has alcanzado el limite de ${MAX_ATTEMPTS} mensajes por hoy. Intenta de nuevo en ${formatTime(remainingTime)}.`
                      : `Espera ${formatTime(remainingTime)} antes de enviar otro mensaje. Te quedan ${attemptsLeft} intento(s).`}
                  </p>
                </motion.div>
              )}

              {/* Feedback: Success */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-success/30 bg-success/10"
                >
                  <span className="font-source-code text-xs tracking-wider text-success uppercase">
                    {'<'} Mensaje enviado con exito. Te contactaremos pronto. {'/>'}
                  </span>
                  {attemptsLeft > 0 && (
                    <p className="font-roboto-flex text-xs text-gray-400 mt-2">
                      Te quedan {attemptsLeft} intento(s) disponible(s).
                    </p>
                  )}
                </motion.div>
              )}

              {/* Feedback: Error */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-red-500/30 bg-red-500/10"
                >
                  <span className="font-source-code text-xs tracking-wider text-red-400 uppercase">
                    {'<'} Error: {errorMsg} {'/>'}
                  </span>
                </motion.div>
              )}

              {/* Boton */}
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "rate-limited"}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(25, 255, 0, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-success/10 border border-success/30 text-success font-source-code text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-success/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-success border-t-transparent rounded-full animate-spin" />
                    {'<'} Enviando {'/>'}
                  </>
                ) : status === "rate-limited" ? (
                  <>
                    <PaperPlaneRight className="w-5 h-5" weight="duotone" />
                    {'<'} Bloqueado temporalmente {'/>'}
                  </>
                ) : (
                  <>
                    <PaperPlaneRight className="w-5 h-5" weight="duotone" />
                    {'<'} Enviar solicitud {'/>'}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Decoracion */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-success/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 blur-[180px] rounded-full pointer-events-none" />
    </section>
  );
}
