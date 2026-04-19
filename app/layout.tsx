import type { Metadata } from "next";
import { Poppins, Rethink_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Ecodent – Advanced Dental Care You Can Trust",
  description:
    "Digital diagnostics, minimally invasive procedures, and predictable outcomes at every stage of treatment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${rethinkSans.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
