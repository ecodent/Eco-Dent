import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { cookies } from "next/headers";
import type { Lang } from "./i18n/translations";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "./components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SEO_COPY,
  buildAlternates,
  organizationSchema,
  dentalClinicSchema,
  websiteSchema,
} from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#0168FF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_COPY.ro.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO_COPY.ro.home.description,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: SEO_COPY.ro.keywords,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "health",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: buildAlternates("/"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SEO_COPY.ro.home.title,
    description: SEO_COPY.ro.home.description,
    url: `${SITE_URL}/ro`,
    locale: "ro_MD",
    alternateLocale: ["ru_MD"],
    images: [
      {
        url: "/clinica1.jpg",
        width: 1200,
        height: 630,
        alt: "Clinica stomatologică EcoDent — Ștefan Vodă",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_COPY.ro.home.title,
    description: SEO_COPY.ro.home.description,
    images: ["/clinica1.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  // Geo + voice/AI search hints
  other: {
    "geo.region": "MD-SV",
    "geo.placename": "Ștefan Vodă",
    "geo.position": "46.5158631;29.6710852",
    ICBM: "46.5158631, 29.6710852",
    "DC.title": SEO_COPY.ro.home.title,
    rating: "general",
  },
  // verification: { google: "REPLACE_WITH_GSC_TOKEN", yandex: "REPLACE_WITH_YANDEX_TOKEN" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieLang = ((await cookies()).get("ecodent.lang")?.value ??
    "ro") as Lang;
  return (
    <html
      lang={cookieLang === "ru" ? "ru-MD" : "ro-MD"}
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        <JsonLd
          data={[
            organizationSchema(),
            dentalClinicSchema(),
            websiteSchema(cookieLang),
          ]}
        />
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1230090732333035');fbq('track','PageView');`}
        </Script>
      </head>
      <body className={`min-h-full flex flex-col ${poppins.className}`}>
        <LanguageProvider initialLang={cookieLang}>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1230090732333035&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
