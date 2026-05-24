// ============================================================
// EmailJS - Configuracion de envio de emails
// ============================================================
// Para configurar:
// 1. Registrate en https://www.emailjs.com
// 2. Conecta tu Gmail en "Email Services"
// 3. Crea una plantilla en "Email Templates"
// 4. Copia los IDs aqui abajo
// ============================================================

export const EMAILJS_CONFIG = {
  /** Service ID de EmailJS (ej: "service_abc123") */
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",

  /** Template ID de EmailJS (ej: "template_xyz789") */
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",

  /** Public Key de EmailJS (ej: "abc123def456") */
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
} as const;

/** Verifica si EmailJS esta configurado correctamente */
export function isEmailJSConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey
  );
}
