import type { Metadata } from "next";
import { Tomorrow, Roboto_Flex, Source_Code_Pro } from "next/font/google";
import "../globals.css";

const tomorrow = Tomorrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tomorrow",
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DIV21.cloud - Plataforma de Innovacion Tecnica",
  description:
    "Infraestructura enterprise en el edge para Latinoamerica. Despliegue de aplicaciones, seguridad enterprise y cloud hibrido.",
  keywords: [
    "DIV21",
    "cloud",
    "infraestructura",
    "edge",
    "Latinoamerica",
    "Bolivia",
    "Brasil",
  ],
  openGraph: {
    title: "DIV21.cloud",
    description:
      "Plataforma de innovacion tecnica para Latinoamerica. Infraestructura enterprise en el edge.",
    type: "website",
    locale: "es_BO",
  },
};

export default function RootLayout({
  children,
  params: { country },
}: Readonly<{ children: React.ReactNode; params: { country: string } }>) {
  return (
    <html
      lang={country === "br" ? "pt-BR" : "es-BO"}
      className={`${tomorrow.variable} ${robotoFlex.variable} ${sourceCodePro.variable}`}
    >
      <body className="font-roboto-flex bg-primary text-white antialiased">
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
