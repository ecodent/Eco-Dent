import type { Metadata } from "next";
import { cookies } from "next/headers";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Contact from "../Contact";
import { getSiteSettings } from "@/lib/data";
import { SITE_URL, buildAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Contact | EcoDent",
  description:
    "Contactează Clinica Stomatologică EcoDent din Ștefan Vodă. Programează o consultație, găsește-ne pe hartă sau scrie-ne un mesaj.",
  alternates: buildAlternates("/contact"),
  openGraph: {
    type: "website",
    title: "Contact | EcoDent",
    description:
      "Contactează Clinica Stomatologică EcoDent din Ștefan Vodă. Programează o consultație, găsește-ne pe hartă sau scrie-ne un mesaj.",
    url: `${SITE_URL}/contact`,
    images: [{ url: "/clinica1.jpg", width: 1200, height: 630 }],
  },
};

export default async function ContactPage() {
  const cookieLang = (await cookies()).get("ecodent.lang")?.value ?? "ro";
  const isRu = cookieLang === "ru";
  const s = await getSiteSettings();

  return (
    <div style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <Contact
          phone={isRu ? s.contactPhone_ru || s.contactPhone : s.contactPhone}
          email={s.contactEmail}
          address={
            isRu ? s.contactAddress_ru || s.contactAddress : s.contactAddress
          }
          hours={isRu ? s.contactHours_ru || s.contactHours : s.contactHours}
        />
      </div>
      <Footer />
    </div>
  );
}
