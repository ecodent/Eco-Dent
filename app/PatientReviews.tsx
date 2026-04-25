"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useT } from "./i18n/LanguageProvider";

interface ReviewItem {
  name: string;
  image: string;
  grade: number;
  text: string;
}

interface PatientReviewsProps {
  reviews: ReviewItem[];
  title?: string;
  titleItalic?: string;
  description?: string;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ display: "inline-flex", gap: "2px", fontSize: "16px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            color:
              i < full ? "#F5B800" : half && i === full ? "#F5B800" : "#D1D5DB",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} style={{ fontWeight: 700, color: "#0F1A2D" }}>
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function PatientReviews({ reviews, title, titleItalic, description }: PatientReviewsProps) {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;
  const { t } = useT();

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1280);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CARD_W = isMobile ? 90 : isTablet ? 65 : 60;
  const SIDE_W = isMobile ? 0 : isTablet ? 14 : 18;
  const SIDE_GAP = isMobile ? 0 : 1.5;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // indices for left, center, right
  const leftIdx = (((current - 1) % total) + total) % total;
  const centerIdx = current;
  const rightIdx = (current + 1) % total;

  const leftReview = reviews[leftIdx];
  const centerReview = reviews[centerIdx];
  const rightReview = reviews[rightIdx];

  if (total === 0) return null;

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        height: isMobile ? "auto" : "auto",
        minHeight: isMobile ? "560px" : "640px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F8F8F8",
        overflow: isMobile ? "visible" : "hidden",
        paddingBottom: isMobile ? "70px" : "56px",
      }}
    >
      {/* Header */}
      <div
        className="section-px"
        style={{
          paddingTop: isMobile ? "40px" : "56px",
          paddingBottom: 0,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: isMobile ? "16px" : "0",
          flexShrink: 0,
        }}
      >
        {/* Left: title + counter + description */}
        <div>
          <h2
            className="text-[32px] md:text-[42px] lg:text-[48px]"
            style={{
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#0F1A2D",
              letterSpacing: "-0.02em",
            }}
          >
            {title || t("reviews.title")}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700 }}>
              {titleItalic || t("reviews.title.italic")}
            </span>
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "20px",
              fontSize: "14px",
              color: "#878C96",
            }}
          >
            <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            <span>—</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "#878C96",
              maxWidth: "340px",
              marginTop: "12px",
            }}
          >
            {description
              ? description
              : (<>{t("reviews.description.start")}<span style={{ fontWeight: 600, color: "#0F1A2D" }}>{t("reviews.description.bold1")}</span>{t("reviews.description.mid1")}<span style={{ fontWeight: 600, color: "#0F1A2D", fontStyle: "italic" }}>{t("reviews.description.bold2")}</span>{t("reviews.description.mid2")}<span style={{ fontWeight: 600, color: "#0F1A2D" }}>{t("reviews.description.bold3")}</span>{t("reviews.description.mid3")}<span style={{ fontWeight: 600, color: "#0F1A2D", fontStyle: "italic" }}>{t("reviews.description.bold4")}</span>{t("reviews.description.end")}</>)}
          </p>
        </div>

        {/* Right: reviews count + nav buttons */}
        <div style={{ textAlign: "right" }}>
          <span
            style={{
              fontSize: "13px",
              color: "#878C96",
              letterSpacing: "0.04em",
            }}
          >
            {t("reviews.label")}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                fontSize: "56px",
                fontWeight: 700,
                color: "#0F1A2D",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              42
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F1A2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          {/* Nav buttons — visible on desktop only */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                onClick={prev}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="Previous review"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F1A2D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={next}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "#0168FF",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 6px 24px rgba(1,104,255,0.35)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="Next review"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards area — full bleed, same structure as BeforeAfter but INVERTED */}
      <div
        style={{
          flex: 1,
          position: "relative",
          marginTop: "40px",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        {/* LEFT side card — at BOTTOM, just text + big thumbnail, no white box above */}
        {!isMobile && (
          <div
            onClick={prev}
            style={{
              position: "absolute",
              bottom: "40px",
              width: `${SIDE_W}vw`,
              left: 0,
              borderRadius: "0 24px 24px 0",
              overflow: "hidden",
              cursor: "pointer",
              zIndex: 1,
              transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              backgroundColor: "transparent",
            }}
          >
            {/* Bottom: Grade + score + name + thumbnail */}
            <div
              style={{
                padding: "14px 16px 16px 16px",
                backgroundColor: "#FFFFFF",
                borderRadius: "0 24px 24px 0",
                flexShrink: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "12px",
              }}
            >
              {/* Left: Grade info */}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "11px", color: "#878C96" }}>
                  {t("reviews.grade")}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#0F1A2D",
                    }}
                  >
                    {leftReview.grade.toFixed(1)}
                  </span>
                  <Stars rating={leftReview.grade} />
                </div>
                <div
                  style={{
                    marginTop: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#0F1A2D",
                    }}
                  >
                    {leftReview.name}
                  </span>
                </div>
              </div>
              {/* Right: large thumbnail nearly full height of container */}
              <div
                style={{
                  width: "90px",
                  height: "110px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={leftReview.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="90px"
                />
              </div>
            </div>
          </div>
        )}

        {/* CENTER card — photo left + white review card right */}
        <div
          style={{
            position: "relative",
            width: `${CARD_W}vw`,
            marginLeft: `${SIDE_W + SIDE_GAP}vw`,
            marginRight: `${SIDE_W + SIDE_GAP}vw`,
            alignSelf: "stretch",
            marginBottom: "40px",
            borderRadius: "28px",
            overflow: "hidden",
            zIndex: 5,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Photo — left half */}
          <div
            style={{
              position: "relative",
              width: isMobile ? "100%" : "45%",
              height: isMobile ? "250px" : "auto",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src={centerReview.image}
              alt={centerReview.name}
              fill
              className="object-cover object-top"
              sizes="30vw"
              priority
            />
          </div>

          {/* Review card — right half */}
          <div
            style={{
              flex: 1,
              padding: isMobile ? "24px 20px" : "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  color: "#878C96",
                  letterSpacing: "0.04em",
                }}
              >
                {t("reviews.grade")}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#0F1A2D",
                  }}
                >
                  {centerReview.grade.toFixed(1)}
                </span>
                <Stars rating={centerReview.grade} />
              </div>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "#878C96",
                  marginTop: "24px",
                }}
              >
                {renderBoldText(centerReview.text)}
              </p>
            </div>
            {/* Bottom: name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "24px",
              }}
            >
              <span
                style={{ fontSize: "16px", fontWeight: 500, color: "#0F1A2D" }}
              >
                {centerReview.name}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT side card — at TOP (inverted from BA's bottom-right) */}
        {!isMobile && (
          <div
            onClick={next}
            style={{
              position: "absolute",
              top: "0",
              width: `${SIDE_W}vw`,
              right: 0,
              borderRadius: "24px 0 0 24px",
              overflow: "hidden",
              cursor: "pointer",
              zIndex: 1,
              transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Photo — top portion */}
            <div
              style={{
                position: "relative",
                height: "220px",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <Image
                src={rightReview.image}
                alt={rightReview.name}
                fill
                className="object-cover"
                sizes="20vw"
                style={{ objectPosition: "center top" }}
              />
            </div>
            {/* Info — bottom portion */}
            <div
              style={{
                padding: "14px 16px 16px 16px",
                backgroundColor: "#FFFFFF",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "11px", color: "#878C96" }}>
                {t("reviews.grade")}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#0F1A2D",
                  }}
                >
                  {rightReview.grade.toFixed(1)}
                </span>
                <Stars rating={rightReview.grade} />
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0F1A2D",
                  marginTop: "6px",
                }}
              >
                {rightReview.name}
              </p>
            </div>
          </div>
        )}

        {/* Mobile nav buttons — centered below cards */}
        {isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <button
              onClick={prev}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Previous review"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F1A2D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "#0168FF",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(1,104,255,0.4)",
              }}
              aria-label="Next review"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
