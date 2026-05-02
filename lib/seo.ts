/**
 * Central SEO configuration for EcoDent.
 * NAP (Name, Address, Phone) — keep in sync with footer + Contact section.
 */

export const SITE_URL = "https://ecodent.md";
export const SITE_NAME = "EcoDent";
export const DEFAULT_LANG = "ro" as const;
export const SUPPORTED_LANGS = ["ro", "ru"] as const;
export type SiteLang = (typeof SUPPORTED_LANGS)[number];

export const NAP = {
  legalName: "EcoDent",
  brand: "EcoDent — Clinică Stomatologică",
  phone: "+37369221112",
  phoneDisplay: "+373 69 221 112",
  email: "ecodent.md@gmail.com",
  street: "str. Ștefan cel Mare 5",
  city: "Ștefan Vodă",
  region: "Ștefan Vodă",
  country: "MD",
  postalCode: "4201",
  // Google Maps coordinates (from embed in Contact.tsx: 46.5158631, 29.6710852)
  latitude: 46.5158631,
  longitude: 29.6710852,
  geoRegion: "MD-SV", // ISO 3166-2:MD code for Ștefan Vodă
} as const;

export const OPENING_HOURS = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  { dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
];

/** Localized site copy used in metadata fallbacks. */
export const SEO_COPY: Record<
  SiteLang,
  {
    home: { title: string; description: string };
    services: { title: string; description: string };
    siteDescription: string;
    keywords: string[];
  }
> = {
  ro: {
    home: {
      title:
        "EcoDent Ștefan Vodă — Clinică stomatologică modernă | Implanturi, Estetică, Endodonție",
      description:
        "Clinică dentară EcoDent în Ștefan Vodă, Moldova. Diagnostic digital, implanturi dentare, estetică, endodonție, igienizare profesională. Programări online, medici cu peste 10 ani experiență.",
    },
    services: {
      title:
        "Servicii Stomatologice — Implanturi, Estetică, Endodonție | EcoDent Ștefan Vodă",
      description:
        "Servicii complete de stomatologie în Ștefan Vodă: imagistică dentară 3D, implanturi, dantură fixă pe implanturi, estetică dentară, endodonție, igienizare profesională.",
    },
    siteDescription:
      "Clinică stomatologică modernă în Ștefan Vodă, Moldova. Diagnostic digital, proceduri minim invazive și rezultate predictibile.",
    keywords: [
      "stomatolog Ștefan Vodă",
      "clinica dentara Stefan Voda",
      "implant dentar Moldova",
      "implanturi dentare Ștefan Vodă",
      "albire dinți Moldova",
      "estetică dentară",
      "endodonție",
      "tomografie CBCT",
      "dantura fixa pe implanturi",
      "EcoDent",
    ],
  },
  ru: {
    home: {
      title:
        "EcoDent Штефан Водэ — Современная стоматологическая клиника | Имплантация, Эстетика",
      description:
        "Стоматологическая клиника EcoDent в Штефан Водэ, Молдова. Цифровая диагностика, имплантация зубов, эстетическая стоматология, эндодонтия, профессиональная гигиена.",
    },
    services: {
      title:
        "Стоматологические услуги — Имплантация, Эстетика, Эндодонтия | EcoDent",
      description:
        "Полный спектр стоматологических услуг в Штефан Водэ: 3D-диагностика, имплантация, эстетика, эндодонтия, профессиональная гигиена полости рта.",
    },
    siteDescription:
      "Современная стоматологическая клиника в Штефан Водэ, Молдова. Цифровая диагностика, малоинвазивные процедуры и предсказуемый результат.",
    keywords: [
      "стоматолог Штефан Водэ",
      "стоматология Молдова",
      "имплантация зубов Молдова",
      "имплант зуба Штефан Водэ",
      "отбеливание зубов",
      "эстетическая стоматология",
      "эндодонтия",
      "EcoDent",
    ],
  },
};

/** Build language-alternates map for a path (without lang prefix). */
export function buildAlternates(path: string) {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: `${SITE_URL}/ro${clean}`,
    languages: {
      "ro-MD": `${SITE_URL}/ro${clean}`,
      "ru-MD": `${SITE_URL}/ru${clean}`,
      "x-default": `${SITE_URL}/ro${clean}`,
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  JSON-LD Schema Generators                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: NAP.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    email: NAP.email,
    telephone: NAP.phone,
    sameAs: [
      "https://www.facebook.com/ecodent.md",
      "https://www.instagram.com/ecodent.md/",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.region,
      postalCode: NAP.postalCode,
      addressCountry: NAP.country,
    },
  };
}

export function dentalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["DentalClinic", "LocalBusiness", "MedicalBusiness"],
    "@id": `${SITE_URL}/#dentalclinic`,
    name: SITE_NAME,
    description:
      "Clinică stomatologică modernă în Ștefan Vodă: implanturi, estetică, endodonție, igienizare profesională.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: [`${SITE_URL}/clinica1.jpg`, `${SITE_URL}/clinica222.png`],
    telephone: NAP.phone,
    email: NAP.email,
    priceRange: "$$",
    currenciesAccepted: "MDL, EUR",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.region,
      postalCode: NAP.postalCode,
      addressCountry: NAP.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.latitude,
      longitude: NAP.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${NAP.latitude},${NAP.longitude}`,
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [
      "https://www.facebook.com/ecodent.md",
      "https://www.instagram.com/ecodent.md/",
    ],
    medicalSpecialty: [
      "Dentistry",
      "CosmeticDentistry",
      "DentalImplant",
      "Endodontic",
    ],
    availableService: [
      { "@type": "MedicalProcedure", name: "Implanturi dentare" },
      { "@type": "MedicalProcedure", name: "Dantură fixă pe implanturi" },
      { "@type": "MedicalProcedure", name: "Estetică dentară" },
      { "@type": "MedicalProcedure", name: "Endodonție" },
      { "@type": "MedicalProcedure", name: "Igienizare profesională" },
      { "@type": "MedicalProcedure", name: "Tomografie CBCT 3D" },
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ștefan Vodă" },
      { "@type": "Country", name: "Republica Moldova" },
    ],
  };
}

export function websiteSchema(lang: SiteLang = "ro") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: lang === "ro" ? "ro-MD" : "ru-MD",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

/** Default FAQs used as fallback for AI/voice search & featured snippets. */
export const DEFAULT_FAQS_RO = [
  {
    question: "Unde se află clinica EcoDent?",
    answer:
      "Clinica stomatologică EcoDent se află în Ștefan Vodă, Republica Moldova. Pentru programări sunați la +373 69 221 112.",
  },
  {
    question: "Ce servicii stomatologice oferă EcoDent?",
    answer:
      "EcoDent oferă imagistică dentară 3D (CBCT), implanturi dentare, dantură fixă pe implanturi, estetică dentară, endodonție și igienizare profesională.",
  },
  {
    question: "Cum pot face o programare la EcoDent?",
    answer:
      "Puteți face o programare telefonic la +373 69 221 112, prin WhatsApp, Viber sau prin formularul de pe site-ul ecodent.md.",
  },
  {
    question: "Care este programul clinicii EcoDent?",
    answer:
      "Programul clinicii EcoDent: Luni–Vineri 09:00–18:00, Sâmbătă 09:00–14:00.",
  },
];

export const DEFAULT_FAQS_RU = [
  {
    question: "Где находится клиника EcoDent?",
    answer:
      "Стоматологическая клиника EcoDent находится в городе Штефан Водэ, Республика Молдова. Запись по телефону +373 69 221 112.",
  },
  {
    question: "Какие услуги предлагает EcoDent?",
    answer:
      "EcoDent предлагает 3D-диагностику (CBCT), имплантацию зубов, несъёмные протезы на имплантах, эстетическую стоматологию, эндодонтию и профессиональную гигиену.",
  },
  {
    question: "Как записаться в клинику EcoDent?",
    answer:
      "Запись по телефону +373 69 221 112, через WhatsApp, Viber или через форму на сайте ecodent.md.",
  },
  {
    question: "Какой график работы клиники EcoDent?",
    answer:
      "График работы: Пн–Пт 09:00–18:00, Сб 09:00–14:00.",
  },
];
