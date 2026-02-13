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
  title: "DIV21.cloud",
  description: "Plataforma de innovación técnica para Latinoamérica.",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  return (
    <html lang={locale} className={`${tomorrow.variable} ${robotoFlex.variable} ${sourceCodePro.variable}`}>
      <body className="font-roboto-flex bg-background text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
