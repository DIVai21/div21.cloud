"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import {
  SignIn,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError("Supabase no configurado. Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-success/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 blur-[180px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header del login */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo className="h-14 text-success" />
          </div>
          <span className="font-source-code text-xs tracking-[0.3em] text-success/60 uppercase">
            {'<'} Acceso restringido {'/>'}
          </span>
          <h1 className="mt-4 font-tomorrow text-2xl font-bold text-white tracking-tight">
            Panel de <span className="text-success">control</span>
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block font-source-code text-xs tracking-wider text-gray-300 mb-2 uppercase">
              {'<'} Email {'/>'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dev@div21.cloud"
              required
              className="w-full h-12 bg-white/5 border border-white/10 px-4 text-white font-roboto-flex text-sm placeholder:text-gray-600 focus:outline-none focus:border-success focus:ring-2 focus:ring-success/30 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-source-code text-xs tracking-wider text-gray-300 mb-2 uppercase">
              {'<'} Password {'/>'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-12 bg-white/5 border border-white/10 px-4 pr-12 text-white font-roboto-flex text-sm placeholder:text-gray-600 focus:outline-none focus:border-success focus:ring-2 focus:ring-success/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeSlash className="w-4 h-4" weight="duotone" />
                ) : (
                  <Eye className="w-4 h-4" weight="duotone" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 border border-red-500/30 bg-red-500/10"
            >
              <span className="font-source-code text-xs tracking-wider text-red-400 uppercase">
                {'<'} Error: {error} {'/>'}
              </span>
            </motion.div>
          )}

          {/* Boton */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 40px rgba(25, 255, 0, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 bg-success/10 border border-success/30 text-success font-source-code text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-success/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-success border-t-transparent rounded-full animate-spin" />
                {'<'} Verificando {'/>'}
              </>
            ) : (
              <>
                <SignIn className="w-5 h-5" weight="duotone" />
                {'<'} Ingresar al sistema {'/>'}
              </>
            )}
          </motion.button>
        </form>

        {/* Footer del login */}
        <div className="mt-8 text-center">
          <span className="font-source-code text-[10px] tracking-[0.2em] text-gray-600 uppercase">
            {'<'} DIV21.cloud &copy; {new Date().getFullYear()} {'/>'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
