import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Termeni și Condiții | EcoDent",
  description:
    "Termenii și condițiile de utilizare a site-ului și serviciilor Clinicii Stomatologice EcoDent din Ștefan Vodă, Republica Moldova.",
  robots: { index: false },
};

export default async function TermeniSiConditii() {
  const cookieLang = (await cookies()).get("ecodent.lang")?.value ?? "ro";
  const isRu = cookieLang === "ru";

  return (
    <>
      <Navbar />
      <main
        style={{
          backgroundColor: "#F8F8F8",
          paddingTop: "120px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
            fontFamily: "inherit",
          }}
        >
          {/* Breadcrumb */}
          <div style={{ marginBottom: "32px", fontSize: "14px", color: "#878C96" }}>
            <Link href={`/${cookieLang}`} style={{ color: "#0168FF", textDecoration: "none" }}>
              {isRu ? "Главная" : "Acasă"}
            </Link>
            {" › "}
            {isRu ? "Условия использования" : "Termeni și Condiții"}
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#0F1A2D",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            {isRu ? "Условия использования" : "Termeni și Condiții"}
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginBottom: "48px" }}>
            {isRu ? "Ultima actualizare: mai 2026" : "Ultima actualizare: mai 2026"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            <Section
              title={isRu ? "1. Informații generale" : "1. Informații generale"}
              body={
                `Prin accesarea și utilizarea site-ului ecodent.md, acceptați în totalitate termenii și condițiile prezentate în continuare. Dacă nu sunteți de acord cu aceștia, vă rugăm să nu utilizați site-ul.\n\nSite-ul este operat de:\nEcoDent — Clinică Stomatologică\nstr. Ștefan cel Mare 5, Ștefan Vodă, MD-4201, Republica Moldova\nTelefon: +373 69 221 112\nEmail: ecodent.md@gmail.com`
              }
            />

            <Section
              title={isRu ? "2. Serviciile oferite" : "2. Serviciile oferite"}
              body={
                `EcoDent oferă servicii stomatologice profesionale, incluzând dar fără a se limita la:\n\n• Implant dentar\n• Albire dentară\n• Ortodonție (aparat dentar)\n• Proteză dentară\n• Tratament de canal\n• Igienă și detartraj profesional\n• Consultații stomatologice\n\nInformațiile prezentate pe site au caracter informativ și nu constituie consultație medicală. Diagnosticul și tratamentul sunt stabilite exclusiv de medicul stomatolog în urma consultației.`
              }
            />

            <Section
              title={isRu ? "3. Programări" : "3. Programări"}
              body={
                `Programările se pot face:\n• Prin formularul de pe site\n• Telefonic: +373 69 221 112\n• Prin WhatsApp sau Viber la același număr\n\nO programare realizată prin site nu garantează automat un loc disponibil — veți fi contactat de echipa noastră pentru confirmare în cel mai scurt timp posibil.\n\nAnularea sau modificarea programării se poate face cu cel puțin 2 ore înainte de ora stabilită, prin telefon sau mesaj.`
              }
            />

            <Section
              title={isRu ? "4. Proprietate intelectuală" : "4. Proprietate intelectuală"}
              body={
                `Toate conținuturile de pe site — texte, imagini, logo-uri, grafice — sunt proprietatea EcoDent și sunt protejate de drepturile de autor. Este interzisă reproducerea, distribuirea sau utilizarea acestora fără acordul scris al EcoDent.`
              }
            />

            <Section
              title={isRu ? "5. Limitarea răspunderii" : "5. Limitarea răspunderii"}
              body={
                `EcoDent depune toate eforturile pentru a menține informațiile de pe site actualizate și corecte, însă nu garantează exactitatea absolută a acestora. Clinica nu este responsabilă pentru:\n\n• Decizii luate exclusiv pe baza informațiilor de pe site, fără consultarea unui medic\n• Întreruperi temporare ale accesului la site din motive tehnice\n• Conținutul site-urilor terțe la care face referire site-ul nostru`
              }
            />

            <Section
              title={isRu ? "6. Modificări ale termenilor" : "6. Modificări ale termenilor"}
              body={
                `EcoDent își rezervă dreptul de a modifica oricând acești termeni și condiții. Modificările intră în vigoare imediat după publicarea pe site. Continuarea utilizării site-ului după publicarea modificărilor constituie acceptul dvs. față de noii termeni.`
              }
            />

            <Section
              title={isRu ? "7. Legislație aplicabilă" : "7. Legislație aplicabilă"}
              body={
                `Acești termeni sunt guvernați de legislația Republicii Moldova. Orice litigiu va fi soluționat de instanțele competente din Republica Moldova.\n\nPentru întrebări sau reclamații:\nEmail: ecodent.md@gmail.com\nTelefon: +373 69 221 112\nAdresă: str. Ștefan cel Mare 5, Ștefan Vodă, MD-4201, Republica Moldova`
              }
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#0F1A2D",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "15px",
          lineHeight: 1.75,
          color: "#4A5568",
          whiteSpace: "pre-line",
        }}
      >
        {body}
      </div>
    </div>
  );
}
