"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "./i18n/LanguageProvider";

export default function Footer() {
  const { t, lang } = useT();
  return (
    <footer
      className="section-px"
      style={{
        backgroundColor: "#0F1A2D",
        paddingTop: "60px",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo & Description */}
        <div>
          <Link href={`/${lang}`}>
            <Image
              src="/logo.footer.png"
              alt="ECODENT"
              width={180}
              height={76}
              unoptimized
              style={{ width: "180px", height: "auto" }}
            />
          </Link>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              marginTop: "20px",
              maxWidth: "280px",
            }}
          >
            {t("footer.description")}
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <a
              href="#"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="rgba(255,255,255,0.6)"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="rgba(255,255,255,0.6)"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  fill="#0F1A2D"
                />
                <line
                  x1="17.5"
                  y1="6.5"
                  x2="17.51"
                  y2="6.5"
                  stroke="#0F1A2D"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Servicii */}
        <div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            {t("footer.services")}
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <Link
              href={`/${lang}/servicii/examinations`}
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.svc.exam")}
            </Link>
            <Link
              href={`/${lang}/servicii/preventive-care`}
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.svc.preventive")}
            </Link>
            <Link
              href={`/${lang}/servicii/teeth-whitening`}
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.svc.whitening")}
            </Link>
            <Link
              href={`/${lang}/servicii/orthodontics`}
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.svc.crowns")}
            </Link>
            <Link
              href={`/${lang}/servicii/oral-surgery`}
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.svc.endo")}
            </Link>
            <Link
              href={`/${lang}/servicii/dental-implants`}
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.svc.implants")}
            </Link>
          </div>
        </div>

        {/* Clinica */}
        <div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            {t("footer.clinic")}
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <a
              href="/#"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.about")}
            </a>
            <a
              href="/#team"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.team")}
            </a>
            <a
              href="/#"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.gallery")}
            </a>
            <a
              href="/#"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {t("footer.reviews")}
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            {t("footer.contact")}
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <a
              href="https://maps.google.com/?q=Ecodent,+Str.+Grigore+Vieru+11,+Ștefan+Vodă"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Str. Grigore Vieru 11, Ștefan Vodă
            </a>
            <a
              href="tel:+37369221112"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +373 69 221 112
            </a>
            <a
              href="mailto:ecodent.web@gmail.com"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              ecodent.web@gmail.com
            </a>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {t("footer.hours.short")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: "40px",
          paddingTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            margin: 0,
          }}
        >
          {t("footer.copyright")}
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          <a
            href="#"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            {t("footer.privacy")}
          </a>
          <a
            href="#"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            {t("footer.terms")}
          </a>
        </div>
      </div>
    </footer>
  );
}
