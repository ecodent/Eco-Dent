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
            {/* Facebook official */}
            <a
              href="https://www.facebook.com/ecodent.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#1877F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.884v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
            {/* Instagram official */}
            <a
              href="https://www.instagram.com/ecodent.md/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
