import Navbar from "../Navbar";
import Footer from "../Footer";
import { cookies } from "next/headers";
import { getServices, getSiteSettings } from "@/lib/data";
import ServicesPageClient from "./ServicesPageClient";

export const dynamic = "force-dynamic";

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServiceItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imagePosition: string;
  features: ServiceFeature[];
  cardColor: string;
}

const fallbackServices: ServiceItem[] = [
  {
    slug: "imagistica-dentara",
    title: "Imagistic\u0103 Dentar\u0103",
    subtitle: "Diagnostic",
    description:
      "Radiografie digital\u0103 \u015fi tomografie CBCT 3D pentru un diagnostic complet \u015fi precis.",
    image: "/radiografie-tomografie dentar\u0103.jpg",
    imagePosition: "center 30%",
    features: [
      { title: "Radiografie digital\u0103", description: "" },
      { title: "Tomografie CBCT 3D", description: "" },
      { title: "OPG Panoramic", description: "" },
      { title: "Planificare digital\u0103", description: "" },
    ],
    cardColor: "#ECEEF1",
  },
  {
    slug: "examinations",
    title: "Examin\u0103ri & Diagnostic",
    subtitle: "Preven\u021bie",
    description:
      "Radiografie digital\u0103, tomografie CBCT \u015fi consulta\u021bii complete pentru un diagnostic precis.",
    image: "/radiografie-tomografie dentar\u0103.jpg",
    imagePosition: "center 30%",
    features: [
      { title: "Radiografie digital\u0103", description: "" },
      { title: "Tomografie CBCT", description: "" },
      { title: "Consulta\u021bie complet\u0103", description: "" },
      { title: "Plan de tratament", description: "" },
    ],
    cardColor: "#ECEEF1",
  },
  {
    slug: "preventive-care",
    title: "Igienizare Profesional\u0103",
    subtitle: "Profilaxie",
    description:
      "Cur\u0103\u021bare, detartraj \u015fi periaj profesional pentru s\u0103n\u0103tatea gingiilor.",
    image: "/Igienizare profesionala.jpg",
    imagePosition: "center 30%",
    features: [
      { title: "Detartraj ultrasonic", description: "" },
      { title: "Airflow", description: "" },
      { title: "Periaj profesional", description: "" },
      { title: "Fluorizare", description: "" },
    ],
    cardColor: "#0F1A2D",
  },
  {
    slug: "teeth-whitening",
    title: "Albire Dentar\u0103",
    subtitle: "Estetic\u0103",
    description:
      "Albire profesional\u0103 pentru un z\u00e2mbet luminos \u015fi natural.",
    image: "/albire dentara.jpg",
    imagePosition: "center 40%",
    features: [
      { title: "Albire \u00een cabinet", description: "" },
      { title: "Gutiere personalizate", description: "" },
      { title: "Rezultate vizibile", description: "" },
      { title: "Tratament sigur", description: "" },
    ],
    cardColor: "#0168FF",
  },
  {
    slug: "coroane-punti",
    title: "Coroane & Pun\u021bi",
    subtitle: "Restaurare",
    description:
      "Restaur\u0103ri protetice de calitate pentru un z\u00e2mbet complet \u015fi func\u021bional.",
    image: "/service-coroane,punti.png",
    imagePosition: "center 30%",
    features: [
      { title: "Coroane ceramice", description: "" },
      { title: "Pun\u021bi dentare", description: "" },
      { title: "Fa\u021bete", description: "" },
      { title: "Inlay / Onlay", description: "" },
    ],
    cardColor: "#ECEEF1",
  },
  {
    slug: "oral-surgery",
    title: "Terapie & Endodon\u021bie",
    subtitle: "Tratament",
    description:
      "Tratamente de canal moderne pentru salvarea din\u021bilor \u015fi eliminarea durerii.",
    image: "/terapie si endodontie.png",
    imagePosition: "center 30%",
    features: [
      { title: "Tratament de canal", description: "" },
      { title: "Microscop dentar", description: "" },
      { title: "Obtura\u021bii estetice", description: "" },
      { title: "Tratament parodontal", description: "" },
    ],
    cardColor: "#0F1A2D",
  },
  {
    slug: "dental-implants",
    title: "Dantur\u0103 Fix\u0103 pe Implanturi",
    subtitle: "Implantologie",
    description:
      "Implanturi dentare de calitate premium pentru o dantur\u0103 fix\u0103 \u015fi natural\u0103.",
    image: "/dantura fixa pe implanturi.jpg",
    imagePosition: "center 30%",
    features: [
      { title: "Implanturi premium", description: "" },
      { title: "Protetic\u0103 pe implanturi", description: "" },
      { title: "All-on-4 / All-on-6", description: "" },
      { title: "Garan\u021bie pe via\u021b\u0103", description: "" },
    ],
    cardColor: "#ECEEF1",
  },
];

export default async function ServicesPage() {
  let rawServices: any[] = [];
  try {
    rawServices = await getServices();
  } catch {
    rawServices = [];
  }

  const cookieLang = (await cookies()).get("ecodent.lang")?.value ?? "ro";

  let services: ServiceItem[] = (
    rawServices.length > 0 ? rawServices : fallbackServices
  ).map((svc: any) => {
    if (cookieLang === "ru") {
      return {
        ...svc,
        title: svc.title_ru || svc.title,
        subtitle: svc.subtitle_ru || svc.subtitle,
        description: svc.description_ru || svc.description,
        features: (svc.features || []).map((f: any) => ({
          title: f.title_ru || f.title,
          description: f.description_ru || f.description,
        })),
      };
    }
    return svc;
  });

  let s: Record<string, string> = {};
  try {
    s = await getSiteSettings();
  } catch {
    /* ignore */
  }

  const sr = s as Record<string, string>;

  const svcStats =
    cookieLang === "ru"
      ? [
          {
            num: sr.svcStat1Value || "6+",
            label: sr.svcStat1Label_ru || "Специализаций",
          },
          {
            num: sr.svcStat2Value || "5K+",
            label: sr.svcStat2Label_ru || "Пациентов пролечено",
          },
          {
            num: sr.svcStat3Value || "10+",
            label: sr.svcStat3Label_ru || "Лет опыта",
          },
          {
            num: sr.svcStat4Value || "100%",
            label: sr.svcStat4Label_ru || "Цифровая диагностика",
          },
        ]
      : [
          {
            num: s.svcStat1Value || "6+",
            label: s.svcStat1Label || "Specialități",
          },
          {
            num: s.svcStat2Value || "5K+",
            label: s.svcStat2Label || "Pacienți tratați",
          },
          {
            num: s.svcStat3Value || "10+",
            label: s.svcStat3Label || "Ani experiență",
          },
          {
            num: s.svcStat4Value || "100%",
            label: s.svcStat4Label || "Diagnostic digital",
          },
        ];

  const svcKicker =
    cookieLang === "ru" ? sr.svcKicker_ru || "Наши Услуги" : s.svcKicker;
  const svcHeading =
    cookieLang === "ru" ? sr.svcHeading_ru || "Всё для" : s.svcHeading;
  const svcHeadingItalic =
    cookieLang === "ru"
      ? sr.svcHeadingItalic_ru || "вашей улыбки."
      : s.svcHeadingItalic;
  const svcDescription =
    cookieLang === "ru"
      ? sr.svcDescription_ru ||
        "От профилактики до имплантологии — полный спектр стоматологических услуг."
      : s.svcDescription;

  return (
    <div style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      <Navbar />
      <ServicesPageClient
        services={services}
        kicker={svcKicker}
        heading={svcHeading}
        headingItalic={svcHeadingItalic}
        description={svcDescription}
        stats={svcStats}
      />
      <Footer />
    </div>
  );
}
