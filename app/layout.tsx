import type { Metadata } from "next";
import { Poppins, Rethink_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ecodent – Îngrijire dentară avansată în care poți avea încredere",
  description:
    "Diagnostic digital, proceduri minim invazive și rezultate predictibile la fiecare etapă a tratamentului.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${poppins.variable} ${rethinkSans.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${poppins.className}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
