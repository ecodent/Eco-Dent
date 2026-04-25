import { getServiceBySlug, getServices } from "@/lib/data";
import ServicePageLayout from "../ServicePageLayout";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

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
  benefits: string[];
  cardColor: string;
}

const fallbackServices: ServiceItem[] = [
  {
    slug: "examinations",
    title: "Examin\u0103ri & Diagnostic",
    subtitle: "Preven\u021bie",
    description:
      "Radiografie digital\u0103, tomografie CBCT \u015fi consulta\u021bii complete pentru un diagnostic precis \u015fi un plan de tratament personalizat.",
    image: "/radiografie-tomografie dentar\u0103.jpg",
    imagePosition: "center 30%",
    cardColor: "#ECEEF1",
    features: [
      {
        title: "Radiografie digital\u0103",
        description: "Imagini clare cu doz\u0103 redus\u0103 de radia\u021bii.",
      },
      {
        title: "Tomografie CBCT 3D",
        description: "Vizualizare tridimensional\u0103 a structurilor dentare.",
      },
      {
        title: "Consulta\u021bie complet\u0103",
        description:
          "Examinare clinic\u0103 detaliat\u0103 a cavit\u0103\u021bii orale.",
      },
      {
        title: "Plan de tratament",
        description:
          "Propunere personalizat\u0103 cu op\u021biuni \u015fi costuri transparente.",
      },
    ],
    benefits: [
      "Echipamente moderne de \u00fbltim\u0103 genera\u021bie",
      "Diagnostic precis \u015fi rapid",
      "Consulta\u021bie gratuit\u0103 pentru prima vizit\u0103",
      "Medici cu experien\u021b\u0103 de peste 10 ani",
    ],
  },
  {
    slug: "preventive-care",
    title: "Igienizare Profesional\u0103",
    subtitle: "Profilaxie",
    description:
      "Cur\u0103\u021bare profesional\u0103, detartraj \u015fi periaj pentru s\u0103n\u0103tatea pe termen lung a din\u021bilor \u015fi gingiilor tale.",
    image: "/Igienizare profesionala.jpg",
    imagePosition: "center 30%",
    cardColor: "#0F1A2D",
    features: [
      {
        title: "Detartraj ultrasonic",
        description: "Eliminarea tartrului supra \u015fi subgingival.",
      },
      {
        title: "Airflow",
        description:
          "Cur\u0103\u021bare cu jet de ap\u0103, aer \u015fi bicarbonat.",
      },
      {
        title: "Periaj profesional",
        description:
          "Polish dentar pentru o suprafa\u021b\u0103 neted\u0103 \u015fi curat\u0103.",
      },
      {
        title: "Fluorizare",
        description:
          "Aplicarea fluorului pentru protec\u021bia smal\u021bului.",
      },
    ],
    benefits: [
      "Prevenirea cariei \u015fi bolilor parodontale",
      "Denti mai albi \u015fi un z\u00e2mbet proasp\u0103t",
      "Procedur\u0103 nedureroaas\u0103 \u015fi rapid\u0103",
      "Recomandat\u0103 de 2 ori pe an",
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Albire Dentar\u0103",
    subtitle: "Estetic\u0103",
    description:
      "Albire profesional\u0103 \u00een cabinet pentru un z\u00e2mbet luminos \u015fi natural, cu rezultate vizibile \u00eenc\u0103 din prima \u015fedin\u021b\u0103.",
    image: "/albire dentara.jpg",
    imagePosition: "center 40%",
    cardColor: "#0168FF",
    features: [
      {
        title: "Albire \u00een cabinet",
        description: "Protocol profesional cu gel activat de lumin\u0103 LED.",
      },
      {
        title: "Gutiere personalizate",
        description:
          "Gutiere fabricate la comand\u0103 pentru tratament acas\u0103.",
      },
      {
        title: "Evaluare prealabil\u0103",
        description:
          "Verificarea compatibilit\u0103\u021bii dinaintea procedurii.",
      },
      {
        title: "Tratament sigur",
        description:
          "Produse aprobate clinic, f\u0103r\u0103 deteriorarea smal\u021bului.",
      },
    ],
    benefits: [
      "Rezultate cu p\u00e2n\u0103 la 8 nuan\u021be mai deschis",
      "Procedur\u0103 rapid\u0103 — 60\u201390 minute",
      "F\u0103r\u0103 durere, f\u0103r\u0103 sensibilitate",
      "Efect de lung\u0103 durat\u0103",
    ],
  },
  {
    slug: "imagistica-dentara",
    title: "Imagistic\u0103 Dentar\u0103",
    subtitle: "Diagnostic",
    description:
      "Radiografie digital\u0103 \u015fi tomografie CBCT 3D pentru un diagnostic complet \u015fi precis, f\u0103r\u0103 iradiere excesiv\u0103.",
    image: "/radiografie-tomografie dentar\u0103.jpg",
    imagePosition: "center 30%",
    cardColor: "#ECEEF1",
    features: [
      {
        title: "Radiografie digital\u0103",
        description:
          "Imagini de \u00eenalt\u0103 rezolu\u021bie cu doz\u0103 redus\u0103 de radia\u021bii.",
      },
      {
        title: "Tomografie CBCT 3D",
        description:
          "Reconstruc\u021bie 3D a structurilor dentare \u015fi osoase.",
      },
      {
        title: "OPG Panoramic",
        description:
          "Vizualizarea complet\u0103 a arcadei dentare \u015fi sinusurilor.",
      },
      {
        title: "Planificare digital\u0103",
        description:
          "Ghidaj chirurgical digital pentru implanturi \u015fi tratamente complexe.",
      },
    ],
    benefits: [
      "Echipamente CBCT de ultim\u0103 genera\u021bie",
      "Rezultate instant, f\u0103r\u0103 a\u015fteptare",
      "Doz\u0103 minim\u0103 de radia\u021bii",
      "Compatibil cu planificarea implantologic\u0103",
    ],
  },
  {
    slug: "coroane-punti",
    title: "Coroane & Pun\u021bi",
    subtitle: "Restaurare",
    description:
      "Restaur\u0103ri protetice de calitate \u00eenalt\u0103 pentru refacerea func\u021biei \u015fi esteticii dentare, cu materiale premium \u015fi tehnici moderne.",
    image: "/service-coroane,punti.png",
    imagePosition: "center 30%",
    cardColor: "#ECEEF1",
    features: [
      {
        title: "Coroane ceramice",
        description:
          "Coroane integral ceramice sau zirconiu pentru estetic\u0103 maxim\u0103.",
      },
      {
        title: "Pun\u021bi dentare",
        description:
          "Pun\u021bi fixe pentru \u00eenlocuirea din\u021bilor lips\u0103.",
      },
      {
        title: "Fa\u021bete dentare",
        description:
          "Folii subtiri de porcela\u0021bn aplicate pe fa\u021ba din\u021bilor.",
      },
      {
        title: "Inlay / Onlay",
        description:
          "Restaur\u0103ri indirecte confec\u021bionate \u00een laborator.",
      },
    ],
    benefits: [
      "Materiale premium de \u00fbltim\u0103 genera\u021bie",
      "Aspect natural, identic cu din\u021bii reali",
      "Durabilitate de 10\u201315 ani",
      "Adaptare perfect\u0103 la ocluzie",
    ],
  },
  {
    slug: "oral-surgery",
    title: "Terapie & Endodon\u021bie",
    subtitle: "Tratament",
    description:
      "Tratamente de canal moderne efectuate sub microscop pentru salvarea din\u021bilor \u015fi eliminarea durerii, cu precizie maxim\u0103.",
    image: "/terapie si endodontie.png",
    imagePosition: "center 30%",
    cardColor: "#0F1A2D",
    features: [
      {
        title: "Tratament de canal",
        description:
          "Cur\u0103\u021barea \u015fi obturarea canalelor radiculare infectate.",
      },
      {
        title: "Microscop dentar",
        description:
          "Vizualizare magnificat\u0103 pentru precizie maxim\u0103.",
      },
      {
        title: "Obtura\u021bii estetice",
        description: "Plombe compozite de culoarea din\u021belui natural.",
      },
      {
        title: "Tratament parodontal",
        description:
          "Tratamentul afec\u021biunilor gingiilor \u015fi osului alveolar.",
      },
    ],
    benefits: [
      "Salvarea din\u021bilor f\u0103r\u0103 extrac\u021bie",
      "Proceduri sub anestezie local\u0103, f\u0103r\u0103 durere",
      "Tehnologie microscopic\u0103 de precizie",
      "Rezultate durabile pe termen lung",
    ],
  },
  {
    slug: "dental-implants",
    title: "Dantur\u0103 Fix\u0103 pe Implanturi",
    subtitle: "Implantologie",
    description:
      "Implanturi dentare de calitate premium pentru o dantur\u0103 fix\u0103, func\u021bional\u0103 \u015fi natural\u0103, cu rezultate garantate pe via\u021b\u0103.",
    image: "/dantura fixa pe implanturi.jpg",
    imagePosition: "center 30%",
    cardColor: "#ECEEF1",
    features: [
      {
        title: "Implanturi premium",
        description:
          "Implanturi titan din m\u0103rci certificate interna\u021bional.",
      },
      {
        title: "Protetic\u0103 pe implanturi",
        description:
          "Coroane \u015fi pun\u021bi fixe pe implanturi oseointegrate.",
      },
      {
        title: "All-on-4 / All-on-6",
        description:
          "Refacerea integral\u0103 a arcadei pe 4 sau 6 implanturi.",
      },
      {
        title: "Garan\u021bie pe via\u021b\u0103",
        description:
          "Garanta\u021biem oseointegrarea implantului pe via\u021b\u0103.",
      },
    ],
    benefits: [
      "Aspect \u015fi func\u021bie identice cu din\u021bii naturali",
      "F\u0103r\u0103 preze, f\u0103r\u0103 proteze mobile",
      "Durabilitate maxim\u0103 \u2014 solu\u021bie pentru toat\u0103 via\u021ba",
      "Planificare 3D \u015fi ghidaj chirurgical digital",
    ],
  },
];

export async function generateStaticParams() {
  try {
    const services = await getServices();
    return services.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return fallbackServices.map((s) => ({ slug: s.slug }));
  }
}

export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieLang = (await cookies()).get("ecodent.lang")?.value ?? "ro";
  let service: ServiceItem | null = null;
  let dbAvailable = true;
  try {
    service = await getServiceBySlug(slug);
  } catch {
    dbAvailable = false;
    service = null;
  }

  // Fall back to static data ONLY if DB is completely unavailable (connection error)
  if (!service && !dbAvailable) {
    service = fallbackServices.find((s) => s.slug === slug) ?? null;
  }

  if (!service) {
    notFound();
  }

  // Resolve RU fields if language is Russian
  const s = service as Record<string, any>;
  const title = (cookieLang === "ru" && s.title_ru) ? s.title_ru : service.title;
  const subtitle = (cookieLang === "ru" && s.subtitle_ru) ? s.subtitle_ru : service.subtitle;
  const description = (cookieLang === "ru" && s.description_ru) ? s.description_ru : service.description;
  const features = service.features.map((f: any) =>
    cookieLang === "ru" && f.title_ru
      ? { title: f.title_ru, description: f.description_ru || f.description }
      : { title: f.title, description: f.description }
  );
  const benefits = (cookieLang === "ru" && s.benefits_ru?.length)
    ? s.benefits_ru
    : (service.benefits || []);

  return (
    <ServicePageLayout
      title={title}
      subtitle={subtitle}
      description={description}
      image={service.image}
      imagePosition={service.imagePosition}
      features={features}
      benefits={benefits}
    />
  );
}
