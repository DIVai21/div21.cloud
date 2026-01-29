import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIV21",
  description: "Construyendo la próxima generación de ecosistemas de emprendimiento.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
