import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate | EcoDent",
  description:
    "Politica de confidențialitate a Clinicii Stomatologice EcoDent din Ștefan Vodă, Republica Moldova.",
  robots: { index: false },
};

export default async function PoliticaDeConfidentialitate() {
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
            {isRu ? "Политика конфиденциальности" : "Politica de Confidențialitate"}
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
            {isRu ? "Политика конфиденциальности" : "Politica de Confidențialitate"}
          </h1>
          <p style={{ fontSize: "14px", color: "#878C96", marginBottom: "48px" }}>
            {isRu ? "Ultima actualizare: mai 2026" : "Ultima actualizare: mai 2026"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            <Section
              title={isRu ? "1. Cine suntem" : "1. Cine suntem"}
              body={
                isRu
                  ? `Clinica stomatologică EcoDent (denumită în continuare „EcoDent", „noi" sau „clinica") este operatorul datelor cu caracter personal colectate prin intermediul site-ului ecodent.md.\n\nDate de contact:\nDenumire: EcoDent — Clinică Stomatologică\nAdresă: str. Ștefan cel Mare 5, Ștefan Vodă, Republica Moldova, MD-4201\nTelefon: +373 69 221 112\nEmail: ecodent.md@gmail.com`
                  : `Clinica stomatologică EcoDent (denumită în continuare „EcoDent", „noi" sau „clinica") este operatorul datelor cu caracter personal colectate prin intermediul site-ului ecodent.md.\n\nDate de contact:\nDenumire: EcoDent — Clinică Stomatologică\nAdresă: str. Ștefan cel Mare 5, Ștefan Vodă, Republica Moldova, MD-4201\nTelefon: +373 69 221 112\nEmail: ecodent.md@gmail.com`
              }
            />

            <Section
              title={isRu ? "2. Ce date colectăm" : "2. Ce date colectăm"}
              body={
                isRu
                  ? `Colectăm doar datele necesare pentru a vă oferi serviciile noastre:\n\n• Nume și prenume — pentru identificare și programări\n• Număr de telefon — pentru confirmarea programărilor\n• Adresă de email — pentru comunicări privind programarea\n• Mesajul din formularul de contact — pentru a înțelege solicitarea dvs.\n• Date tehnice anonimizate — adresa IP, tipul de browser, paginile vizitate (prin Google Analytics / Vercel Analytics)`
                  : `Colectăm doar datele necesare pentru a vă oferi serviciile noastre:\n\n• Nume și prenume — pentru identificare și programări\n• Număr de telefon — pentru confirmarea programărilor\n• Adresă de email — pentru comunicări privind programarea\n• Mesajul din formularul de contact — pentru a înțelege solicitarea dvs.\n• Date tehnice anonimizate — adresa IP, tipul de browser, paginile vizitate (prin Google Analytics / Vercel Analytics)`
              }
            />

            <Section
              title={isRu ? "3. Cum folosim datele" : "3. Cum folosim datele"}
              body={
                isRu
                  ? `Datele colectate sunt folosite exclusiv pentru:\n\n• Procesarea și confirmarea programărilor\n• Răspunsul la solicitările dvs. prin formularul de contact\n• Îmbunătățirea experienței pe site (date anonimizate)\n• Notificări legate de programarea dvs. (reamintiri, modificări)\n\nNu vindem, nu închiriem și nu transferăm datele dvs. unor terțe părți în scop comercial.`
                  : `Datele colectate sunt folosite exclusiv pentru:\n\n• Procesarea și confirmarea programărilor\n• Răspunsul la solicitările dvs. prin formularul de contact\n• Îmbunătățirea experienței pe site (date anonimizate)\n• Notificări legate de programarea dvs. (reamintiri, modificări)\n\nNu vindem, nu închiriem și nu transferăm datele dvs. unor terțe părți în scop comercial.`
              }
            />

            <Section
              title={isRu ? "4. Stocarea datelor" : "4. Stocarea datelor"}
              body={
                isRu
                  ? `Datele dvs. sunt stocate în baze de date securizate (MongoDB Atlas, cu servere în UE). Le păstrăm atât timp cât este necesar pentru scopul colectării lor sau conform obligațiilor legale în vigoare în Republica Moldova.\n\nPentru solicitările prin formularul de contact, datele sunt păstrate maximum 2 ani.`
                  : `Datele dvs. sunt stocate în baze de date securizate (MongoDB Atlas, cu servere în UE). Le păstrăm atât timp cât este necesar pentru scopul colectării lor sau conform obligațiilor legale în vigoare în Republica Moldova.\n\nPentru solicitările prin formularul de contact, datele sunt păstrate maximum 2 ani.`
              }
            />

            <Section
              title={isRu ? "5. Cookie-uri" : "5. Cookie-uri"}
              body={
                isRu
                  ? `Site-ul nostru folosește cookie-uri pentru:\n\n• Preferința de limbă (cookie ecodent.lang) — necesar pentru funcționarea corectă a site-ului\n• Analiză anonimă a traficului (Vercel Analytics) — fără date personale identificabile\n• Meta Pixel (Facebook) — pentru măsurarea eficienței publicității\n\nPuteți dezactiva cookie-urile din setările browserului dvs., însă unele funcții ale site-ului pot fi afectate.`
                  : `Site-ul nostru folosește cookie-uri pentru:\n\n• Preferința de limbă (cookie ecodent.lang) — necesar pentru funcționarea corectă a site-ului\n• Analiză anonimă a traficului (Vercel Analytics) — fără date personale identificabile\n• Meta Pixel (Facebook) — pentru măsurarea eficienței publicității\n\nPuteți dezactiva cookie-urile din setările browserului dvs., însă unele funcții ale site-ului pot fi afectate.`
              }
            />

            <Section
              title={isRu ? "6. Drepturile dvs." : "6. Drepturile dvs."}
              body={
                isRu
                  ? `Conform legislației Republicii Moldova privind protecția datelor cu caracter personal, aveți dreptul la:\n\n• Acces — să solicitați o copie a datelor pe care le deținem despre dvs.\n• Rectificare — să corectați datele incorecte\n• Ștergere — să solicitați ștergerea datelor (dreptul la uitare)\n• Opoziție — să vă opuneți prelucrării datelor\n\nPentru orice solicitare, contactați-ne la: ecodent.md@gmail.com sau +373 69 221 112`
                  : `Conform legislației Republicii Moldova privind protecția datelor cu caracter personal, aveți dreptul la:\n\n• Acces — să solicitați o copie a datelor pe care le deținem despre dvs.\n• Rectificare — să corectați datele incorecte\n• Ștergere — să solicitați ștergerea datelor (dreptul la uitare)\n• Opoziție — să vă opuneți prelucrării datelor\n\nPentru orice solicitare, contactați-ne la: ecodent.md@gmail.com sau +373 69 221 112`
              }
            />

            <Section
              title={isRu ? "7. Contact" : "7. Contact"}
              body={
                isRu
                  ? `Dacă aveți întrebări privind această politică sau modul în care prelucrăm datele dvs., ne puteți contacta:\n\nEmail: ecodent.md@gmail.com\nTelefon: +373 69 221 112\nAdresă: str. Ștefan cel Mare 5, Ștefan Vodă, MD-4201, Republica Moldova`
                  : `Dacă aveți întrebări privind această politică sau modul în care prelucrăm datele dvs., ne puteți contacta:\n\nEmail: ecodent.md@gmail.com\nTelefon: +373 69 221 112\nAdresă: str. Ștefan cel Mare 5, Ștefan Vodă, MD-4201, Republica Moldova`
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
