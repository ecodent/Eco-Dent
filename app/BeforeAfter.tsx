"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { useT } from "./i18n/LanguageProvider";

interface Case {
  before: string;
  after: string;
  label: string;
  label_ru?: string;
}

interface BeforeAfterProps {
  cases: Case[];
  title?: string;
  titleItalic?: string;
  description?: string;
  cta?: string;
  lang?: string;
}

function CalendarIcon() {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d="M7 4L3 9L7 14" />
      <path d="M11 4L15 9L11 14" />
    </svg>
  );
}

export default function BeforeAfter({
  cases,
  title,
  titleItalic,
  description,
  cta,
  lang,
}: BeforeAfterProps) {
  const [currentCase, setCurrentCase] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = cases.length;
  const { t } = useT();

  const goTo = useCallback(
    (index: number) => {
      setCurrentCase(((index % total) + total) % total);
      setSliderPos(50); // reset slider on case change
    },
    [total],
  );

  const next = useCallback(() => goTo(currentCase + 1), [currentCase, goTo]);
  const prev = useCallback(() => goTo(currentCase - 1), [currentCase, goTo]);

  // Slider drag logic
  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSliderPos(pct);
    },
    [isDragging],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchend", onUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handleMove]);

  // Carousel offsets for side-peeking cards
  const offsets = [-1, 0, 1];
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

  const CARD_W = isMobile ? 88 : isTablet ? 50 : 44; // vw for center card
  const SIDE_W = isMobile ? 0 : isTablet ? 20 : 25; // vw for side cards — bigger
  const SIDE_GAP = isMobile ? 0 : 1.5; // vw gap between side and center

  if (total === 0) return null;

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: isMobile ? "560px" : "800px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F8F8F8",
        overflow: isMobile ? "visible" : "hidden",
        paddingBottom: isMobile ? "70px" : "0",
      }}
    >
      {/* Header */}
      <div
        className="section-px"
        style={{
          paddingTop: isMobile ? "40px" : "72px",
          paddingBottom: 0,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-start",
          gap: isMobile ? "20px" : "0",
          flexShrink: 0,
        }}
      >
        {/* Left: title + counter + description */}
        <div>
          <h2
            className="text-[32px] md:text-[42px] lg:text-[52px]"
            style={{
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#0F1A2D",
              letterSpacing: "-0.02em",
            }}
          >
            {title || t("ba.title")}{" "}
            <span style={{ fontWeight: 700 }}>
              {titleItalic || t("ba.title.italic")}
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
              {String(currentCase + 1).padStart(2, "0")}
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
            {description ? (
              description
            ) : (
              <>
                {t("ba.description.start")}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  {t("ba.description.bold1")}
                </span>
                {t("ba.description.mid1")}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  {t("ba.description.bold2")}
                </span>
                {t("ba.description.mid2")}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  {t("ba.description.bold3")}
                </span>
                {t("ba.description.mid3")}
                <span
                  style={{
                    fontWeight: 600,
                    color: "#0F1A2D",
                  }}
                >
                  {t("ba.description.bold4")}
                </span>
                {t("ba.description.end")}
              </>
            )}
          </p>
        </div>

        {/* Right: Book an appointment button */}
        <button
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            display: isMobile ? "none" : "flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 28px",
            backgroundColor: "#0F1A2D",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "100px",
            fontSize: "15px",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {cta || t("ba.cta")}
          <CalendarIcon />
        </button>
      </div>

      {/* Carousel area — full bleed */}
      <div
        style={{
          flex: 1,
          marginTop: "40px",
          marginBottom: isMobile ? "0" : "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          paddingBottom: isMobile ? "80px" : "0",
        }}
      >
        {/* Cards row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: `${SIDE_GAP}vw`,
            width: "100%",
            paddingLeft: isMobile ? "5vw" : "0",
            paddingRight: isMobile ? "5vw" : "0",
          }}
        >
        {offsets.map((offset) => {
          const idx = (((currentCase + offset) % total) + total) % total;
          const caseData = cases[idx];
          const caseLabel =
            lang === "ru" && caseData.label_ru
              ? caseData.label_ru
              : caseData.label;
          const isCenter = offset === 0;

          if (!isCenter) {
            if (isMobile) return null;
            return (
              <div
                key={`side-${offset}`}
                onClick={() => goTo(currentCase + offset)}
                style={{
                  position: "relative",
                  width: `${SIDE_W}vw`,
                  aspectRatio: "1 / 1",
                  flexShrink: 0,
                  borderRadius: "24px",
                  overflow: "hidden",
                  cursor: "pointer",
                  opacity: 0.75,
                  transition: "opacity 0.3s ease",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
              >
                <Image
                  src={caseData.after}
                  alt={caseLabel}
                  fill
                  className="object-cover"
                  sizes="27vw"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            );
          }

          // Center card — with before/after slider
          return (
            <div
              key={`center-${idx}`}
              ref={containerRef}
              style={{
                position: "relative",
                width: isMobile ? `${CARD_W}vw` : `${CARD_W}vw`,
                aspectRatio: "1 / 1",
                flexShrink: 0,
                borderRadius: "28px",
                overflow: "hidden",
                cursor: isDragging ? "ew-resize" : "default",
                zIndex: 5,
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              {/* After image — full, underneath */}
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={caseData.after}
                  alt={`${caseLabel} - After`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 55vw"
                  priority
                />
              </div>

              {/* Before image — clipped to sliderPos */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
              >
                <Image
                  src={caseData.before}
                  alt={`${caseLabel} - Before`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 55vw"
                  style={{
                    filter:
                      "saturate(0.6) sepia(0.25) brightness(0.92) contrast(0.95)",
                  }}
                />
              </div>

              {/* Slider line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${sliderPos}%`,
                  width: "3px",
                  backgroundColor: "#FFFFFF",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />

              {/* Drag handle */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onTouchStart={() => setIsDragging(true)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${sliderPos}%`,
                  transform: "translate(-50%, -50%)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "ew-resize",
                  zIndex: 15,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  transition: isDragging ? "none" : "left 0.1s ease",
                }}
              >
                <CompareIcon />
              </div>

              {/* BEFORE label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "28px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  zIndex: 8,
                  opacity: 0.9,
                }}
              >
                BEFORE
              </div>

              {/* AFTER label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  right: "28px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  zIndex: 8,
                  opacity: 0.9,
                }}
              >
                AFTER
              </div>
            </div>
          );
        })}
        </div>

        {/* Navigation buttons — centered below cards */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: isMobile ? "absolute" : "relative",
            bottom: isMobile ? "20px" : "auto",
          }}
        >
          <button
            onClick={prev}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.95)",
              border: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            aria-label="Previous case"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F1A2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            aria-label="Next case"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
