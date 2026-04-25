"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useT } from "./i18n/LanguageProvider";
import type { Lang } from "./i18n/translations";

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useT();

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > lastY && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="w-full flex items-center justify-between transition-all duration-300 section-px"
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "#F8F8F8" : "transparent",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          transform:
            hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 0.3s ease, background-color 0.3s, box-shadow 0.3s",
        }}
      >
        <div className="flex items-center flex-shrink-0">
          <a href={`/${lang}`} style={{ display: "flex", lineHeight: 0 }}>
            <Image
              src="/logo.png"
              alt="ECODENT"
              width={160}
              height={67}
              unoptimized
              className="w-[120px] md:w-[160px] h-auto"
            />
          </a>
        </div>

        <div
          className="hidden md:flex items-center"
          style={{ gap: "20px", marginLeft: "28px" }}
        >
          <a
            href={`/${lang}`}
            className="font-medium hover:opacity-70 transition-opacity"
            style={{ fontSize: "15px", color: "#0F1A2D" }}
          >
            {t("nav.home")}
          </a>
          <a
            href={`/${lang}/servicii`}
            className="font-medium hover:opacity-70 transition-opacity"
            style={{ fontSize: "15px", color: "#878C96" }}
          >
            {t("nav.services")}
          </a>
          <a
            href={`/${lang}/servicii/imagistica-dentara`}
            className="hidden xl:inline font-medium hover:opacity-70 transition-opacity"
            style={{ fontSize: "15px", color: "#878C96" }}
          >
            Imagistică Dentară
          </a>
        </div>

        <div
          className="hidden lg:flex items-center"
          style={{ marginLeft: "auto", gap: "12px" }}
        >
          <a
            href="tel:+37369221112"
            className="flex items-center justify-center hover:shadow-lg transition-shadow"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "9999px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F1A2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          <a
            href="https://wa.me/37369221112"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:shadow-lg transition-shadow"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "9999px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0F1A2D">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/ecodent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:shadow-lg transition-shadow"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "9999px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F1A2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="viber://chat?number=%2B37369221112"
            className="flex items-center justify-center hover:shadow-lg transition-shadow"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "9999px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#7360F2">
              <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.034-.656-.227-1.163-.567-1.51-.34-.354-.82-.543-1.476-.58-.027-.002-.053-.002-.078 0z" />
            </svg>
          </a>
          <a
            href="#contact"
            className="flex items-center font-medium hover:shadow-lg transition-shadow"
            style={{
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "9999px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              color: "#0F1A2D",
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            <PhoneIcon />
            {t("nav.contact")}
          </a>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMenuOpen(true)}
          style={{
            width: "44px",
            height: "44px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          aria-label="Open menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0F1A2D"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div
          className="flex justify-between items-center"
          style={{ marginBottom: "32px" }}
        >
          <a href={`/${lang}`} style={{ display: "flex", lineHeight: 0 }}>
            <Image
              src="/logo.png"
              alt="ECODENT"
              width={120}
              height={50}
              unoptimized
              style={{ width: "120px", height: "auto" }}
            />
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F1A2D"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <a
          href={`/${lang}`}
          onClick={() => setMenuOpen(false)}
          style={{
            padding: "14px 0",
            fontSize: "17px",
            fontWeight: 600,
            color: "#0F1A2D",
            textDecoration: "none",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          {t("nav.home")}
        </a>
        <a
          href={`/${lang}/servicii`}
          onClick={() => setMenuOpen(false)}
          style={{
            padding: "14px 0",
            fontSize: "17px",
            fontWeight: 500,
            color: "#878C96",
            textDecoration: "none",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          {t("nav.services")}
        </a>
        <a
          href={`/${lang}/servicii/imagistica-dentara`}
          onClick={() => setMenuOpen(false)}
          style={{
            padding: "14px 0",
            fontSize: "17px",
            fontWeight: 500,
            color: "#878C96",
            textDecoration: "none",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          Imagistică Dentară
        </a>
        <div style={{ marginTop: "20px" }}>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
        <div
          style={{
            marginTop: "auto",
            paddingTop: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <a
            href="tel:+37369221112"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 20px",
              borderRadius: "12px",
              backgroundColor: "#0168FF",
              color: "#FFF",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              justifyContent: "center",
            }}
          >
            <PhoneIcon /> +373 69 221 112
          </a>
        </div>
      </div>
    </>
  );
}

function LangSwitcher({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const opts: Lang[] = ["ro", "ru"];

  const handleSwitch = (o: Lang) => {
    setLang(o); // immediate UI feedback
    const withoutLang = pathname.replace(/^\/(ro|ru)/, "") || "/";
    router.push(`/${o}${withoutLang === "/" ? "" : withoutLang}`);
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        padding: "4px",
        borderRadius: "9999px",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
      }}
    >
      {opts.map((o) => {
        const active = o === lang;
        return (
          <button
            key={o}
            type="button"
            onClick={() => handleSwitch(o)}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 600,
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              backgroundColor: active ? "#0F1A2D" : "transparent",
              color: active ? "#FFFFFF" : "#878C96",
              transition: "all 0.2s",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
            aria-pressed={active}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
