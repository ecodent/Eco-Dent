"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useT } from "../i18n/LanguageProvider";

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imagePosition?: string;
  features: ServiceFeature[];
  benefits: string[];
  ctaText?: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  description,
  image,
  imagePosition = "center 35%",
  features,
  benefits,
  ctaText,
}: ServicePageLayoutProps) {
  const { t } = useT();
  const resolvedCta = ctaText || t("svcDetail.cta");
  return (
    <div style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="section-px"
        style={{
          paddingTop: "110px",
          paddingBottom: "0",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <Link
            href="/services"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#878C96",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t("svcDetail.breadcrumb")}
          </Link>
          <span style={{ fontSize: "13px", color: "#D1D5DB" }}>/</span>
          <span style={{ fontSize: "13px", color: "#0F1A2D", fontWeight: 500 }}>
            {title}
          </span>
        </div>

        {/* Hero content: left text + right image */}
        <div
          className="flex flex-col lg:flex-row"
          style={{ gap: "40px", alignItems: "stretch" }}
        >
          {/* Left: text */}
          <div
            className="flex flex-col justify-between"
            style={{ flex: "0 0 auto", width: "100%", maxWidth: "540px" }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#0168FF",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "20px",
                  backgroundColor: "#EBF2FF",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                }}
              >
                {subtitle}
              </span>
              <h1
                className="text-[36px] md:text-[52px] lg:text-[60px]"
                style={{
                  fontWeight: 300,
                  color: "#0F1A2D",
                  margin: "0 0 24px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                {title.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span
                      key={i}
                      style={{ fontStyle: "italic", fontWeight: 700 }}
                    >
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  ),
                )}
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "#878C96",
                  margin: 0,
                  maxWidth: "460px",
                }}
              >
                {description}
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row"
              style={{ gap: "12px", marginTop: "40px" }}
            >
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  backgroundColor: "#0168FF",
                  color: "#FFFFFF",
                  padding: "16px 36px",
                  borderRadius: "9999px",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {resolvedCta}
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
              </Link>
              <a
                href="tel:+37369221112"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  color: "#0F1A2D",
                  padding: "16px 36px",
                  borderRadius: "9999px",
                  fontSize: "15px",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                +373 69 221 112
              </a>
            </div>
          </div>

          {/* Right: image */}
          <div
            style={{
              flex: 1,
              position: "relative",
              minHeight: "360px",
              borderRadius: "28px",
              overflow: "hidden",
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              style={{ objectPosition: imagePosition }}
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(1,104,255,0.08) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        className="section-px"
        style={{ paddingTop: "80px", paddingBottom: "0" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2
            className="text-[28px] md:text-[38px]"
            style={{
              fontWeight: 300,
              color: "#0F1A2D",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {t("svcDetail.features.title")}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700 }}>
              {t("svcDetail.features.title.italic")}
            </span>
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#878C96",
              margin: 0,
              maxWidth: "280px",
              textAlign: "right",
            }}
          >
            {t("svcDetail.features.subtitle")}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          style={{ gap: "16px" }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    backgroundColor: "#0168FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#0F1A2D",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </h3>
              </div>
              {feature.description && (
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#878C96",
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      {benefits && benefits.length > 0 && (
        <section className="section-px" style={{ paddingTop: "72px" }}>
          <div
            className="flex flex-col lg:flex-row"
            style={{
              backgroundColor: "#0F1A2D",
              borderRadius: "32px",
              overflow: "hidden",
            }}
          >
            {/* Image side */}
            <div
              className="hidden lg:block"
              style={{
                position: "relative",
                width: "380px",
                flexShrink: 0,
                minHeight: "420px",
              }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                style={{ objectPosition: imagePosition }}
                sizes="380px"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, transparent 60%, #0F1A2D 100%)",
                }}
              />
            </div>

            {/* Text side */}
            <div style={{ flex: 1, padding: "clamp(36px, 5vw, 56px)" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "16px",
                }}
              >
                {t("svcDetail.benefits.kicker")}
              </p>
              <h2
                className="text-[26px] md:text-[34px]"
                style={{
                  fontWeight: 300,
                  color: "#FFFFFF",
                  margin: "0 0 36px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                {t("svcDetail.benefits.title")}{" "}
                <span style={{ fontStyle: "italic", fontWeight: 700 }}>
                  {t("svcDetail.benefits.title.italic")}
                </span>
              </h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ gap: "16px" }}
              >
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(1,104,255,0.25)",
                        border: "1px solid rgba(1,104,255,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0168FF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.6,
                      }}
                    >
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section
        className="section-px"
        style={{ paddingTop: "72px", paddingBottom: "100px" }}
      >
        <div
          style={{
            borderRadius: "32px",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            padding: "clamp(36px, 5vw, 60px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#0168FF",
              textTransform: "uppercase",
              letterSpacing: "3px",
              margin: 0,
            }}
          >
            {t("svcDetail.bottom.kicker")}
          </p>
          <h2
            className="text-[24px] md:text-[36px]"
            style={{
              fontWeight: 300,
              color: "#0F1A2D",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {t("svcDetail.bottom.heading")}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700 }}>
              {t("svcDetail.bottom.heading.italic")}
            </span>
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#878C96",
              maxWidth: "420px",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {t("svcDetail.bottom.description")}
          </p>
          <div
            className="flex flex-col sm:flex-row"
            style={{ gap: "12px", marginTop: "8px" }}
          >
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "#0168FF",
                color: "#FFFFFF",
                padding: "16px 40px",
                borderRadius: "9999px",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {resolvedCta}
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
            </Link>
            <a
              href="tel:+37369221112"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                border: "1px solid #E5E7EB",
                color: "#0F1A2D",
                padding: "16px 40px",
                borderRadius: "9999px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              +373 69 221 112
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
