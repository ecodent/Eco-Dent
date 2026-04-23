"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "../i18n/LanguageProvider";

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

function CheckIcon({ dark }: { dark: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={dark ? "rgba(255,255,255,0.7)" : "#0168FF"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ServicesPageClient({ services }: { services: ServiceItem[] }) {
  const { t } = useT();

  const stats = [
    { num: "6+", label: t("svcPage.stats.specialties") },
    { num: "5K+", label: t("svcPage.stats.patients") },
    { num: "10+", label: t("svcPage.stats.years") },
    { num: "100%", label: t("svcPage.stats.digital") },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="section-px" style={{ paddingTop: "130px", paddingBottom: "0" }}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between" style={{ gap: "32px" }}>
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 700,
                color: "#0168FF",
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "20px",
              }}
            >
              {t("svcPage.kicker")}
            </span>
            <h1
              className="text-[40px] md:text-[56px] lg:text-[72px]"
              style={{
                fontWeight: 300,
                color: "#0F1A2D",
                margin: 0,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              {t("svcPage.heading")} <br className="hidden md:block" />
              <span style={{ fontStyle: "italic", fontWeight: 700 }}>
                {t("svcPage.heading.italic")}
              </span>
            </h1>
          </div>
          <p
            style={{
              fontSize: "16px",
              color: "#878C96",
              maxWidth: "380px",
              lineHeight: 1.75,
              margin: 0,
              flexShrink: 0,
            }}
          >
            {t("svcPage.description")}
          </p>
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap"
          style={{
            marginTop: "56px",
            borderTop: "1px solid #E5E7EB",
            borderBottom: "1px solid #E5E7EB",
            paddingTop: "28px",
            paddingBottom: "28px",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                minWidth: "120px",
                paddingRight: "24px",
                paddingLeft: i > 0 ? "24px" : "0",
                borderRight: i < 3 ? "1px solid #E5E7EB" : "none",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 700,
                  color: "#0F1A2D",
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.num}
              </p>
              <p style={{ fontSize: "13px", color: "#878C96", margin: "6px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section-px" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: "16px" }}>
          {services.map((service) => {
            const isDark =
              service.cardColor === "#0F1A2D" || service.cardColor === "#0168FF";
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="svc-grid-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: service.cardColor,
                  borderRadius: "28px",
                  overflow: "hidden",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "240px", flexShrink: 0, overflow: "hidden" }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover svc-grid-img"
                    style={{ objectPosition: service.imagePosition }}
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.22) 100%)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "#FFFFFF",
                      backgroundColor: "rgba(0,0,0,0.32)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      padding: "5px 12px",
                      borderRadius: "9999px",
                    }}
                  >
                    {service.subtitle}
                  </span>
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px",
                    gap: "10px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "19px",
                      fontWeight: 700,
                      color: isDark ? "#FFFFFF" : "#0F1A2D",
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {service.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      color: isDark ? "rgba(255,255,255,0.58)" : "#878C96",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Feature chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "4px" }}>
                    {service.features.slice(0, 4).map((f, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: isDark ? "rgba(255,255,255,0.85)" : "#0F1A2D",
                          backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                        }}
                      >
                        <CheckIcon dark={isDark} />
                        {f.title}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: 600, color: isDark ? "#FFFFFF" : "#0168FF" }}>
                      {t("svcPage.card.cta")}
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "#0168FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      <ArrowIcon />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section-px" style={{ paddingBottom: "100px" }}>
        <div
          style={{
            backgroundColor: "#0F1A2D",
            borderRadius: "32px",
            padding: "clamp(40px, 5vw, 72px) clamp(24px, 5vw, 64px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "24px",
          }}
        >
          <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "3px", margin: 0 }}>
            {t("svcPage.cta.kicker")}
          </p>
          <h2
            className="text-[28px] md:text-[44px]"
            style={{ fontWeight: 300, color: "#FFFFFF", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            {t("svcPage.cta.heading")}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700 }}>{t("svcPage.cta.heading.italic")}</span>
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "480px", lineHeight: 1.75, margin: 0 }}>
            {t("svcPage.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row" style={{ gap: "12px" }}>
            <a
              href="tel:+37369221112"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "9999px",
                backgroundColor: "#0168FF",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              +373 69 221 112
            </a>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              {t("svcPage.cta.message")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
