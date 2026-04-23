"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useT } from "./i18n/LanguageProvider";

interface Doctor {
  name: string;
  role: string;
  image: string;
}

interface TeamCarouselProps {
  doctors: Doctor[];
}

// Card sizing — responsive
const CARD_W_DESKTOP = 20; // vw per card
const CARD_W_MOBILE = 75; // vw on mobile
const GAP = 1.5; // vw gap between cards

export default function TeamCarousel({ doctors }: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const total = doctors.length;
  const { t } = useT();

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

  const CARD_W = isMobile ? CARD_W_MOBILE : isTablet ? 25 : CARD_W_DESKTOP;
  const STEP = CARD_W + GAP;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Auto-play — reset timer on every index change so manual clicks don't conflict
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, total]);

  const offsets = isMobile
    ? [-1, 0, 1]
    : isTablet
      ? [-1, 0, 1]
      : [-2, -1, 0, 1, 2];

  if (total === 0) return null;

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: isMobile ? "750px" : isTablet ? "680px" : "800px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F8F8F8",
        overflow: "hidden",
      }}
    >
      {/* Header with padding */}
      <div
        className="section-px"
        style={{
          paddingTop: isMobile ? "48px" : "72px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-start",
          justifyContent: "space-between",
          flexShrink: 0,
          gap: isMobile ? "16px" : "0",
        }}
      >
        <h2
          className="text-[32px] md:text-[42px] lg:text-[52px]"
          style={{
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#0F1A2D",
            letterSpacing: "-0.02em",
          }}
        >
          {t("team.title")}{" "}
          <span style={{ fontStyle: "italic", fontWeight: 700 }}>
            {t("team.title.italic")}
          </span>
        </h2>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#878C96",
            maxWidth: "320px",
            textAlign: isMobile ? "left" : "right",
          }}
        >
          {t("team.description.start")}
          <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
            {t("team.description.bold1")}
          </span>
          {t("team.description.mid")}
          <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
            {t("team.description.bold2")}
          </span>
          {t("team.description.end")}
        </p>
      </div>

      {/* Full-bleed carousel area — no horizontal padding */}
      <div
        style={{
          flex: 1,
          position: "relative",
          marginTop: isMobile ? "24px" : "48px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: isMobile ? "120px" : "100px", // room for dots + buttons
        }}
      >
        {offsets.map((offset) => {
          const idx = (((currentIndex + offset) % total) + total) % total;
          const doctor = doctors[idx];
          const isCenter = offset === 0;
          const isNear = Math.abs(offset) === 1;
          const isEdge = Math.abs(offset) === 2;

          // Center the group: card 0 at 50% - half card width
          // Edge cards (±2) will be partially off-screen
          const leftPercent = 50 - CARD_W / 2 + offset * STEP;

          const scale = isCenter ? 1 : isNear ? 0.93 : 0.85;
          const opacity = isCenter ? 1 : isNear ? 0.75 : 0.45;
          const zIndex = isCenter ? 10 : isNear ? 5 : 2;

          return (
            <div
              key={`card-${offset}`}
              onClick={() => {
                if (offset !== 0) goTo(currentIndex + offset);
              }}
              style={{
                position: "absolute",
                left: `${leftPercent}vw`,
                bottom: isMobile ? "120px" : "100px",
                width: `${CARD_W}vw`,
                height: isMobile
                  ? isCenter
                    ? "380px"
                    : "340px"
                  : isCenter
                    ? isTablet
                      ? "calc(100% - 60px)"
                      : "calc(100% - 30px)"
                    : isNear
                      ? isTablet
                        ? "calc(100% - 100px)"
                        : "calc(100% - 70px)"
                      : isTablet
                        ? "calc(100% - 140px)"
                        : "calc(100% - 110px)",
                transform: `scale(${scale})`,
                opacity,
                zIndex,
                transition:
                  "left 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                cursor: offset !== 0 ? "pointer" : "default",
                transformOrigin: "bottom center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "28px",
                  overflow: "hidden",
                  backgroundColor: "#E8E8E8",
                  boxShadow: isCenter
                    ? "0 24px 64px rgba(0,0,0,0.18)"
                    : "0 12px 40px rgba(0,0,0,0.10)",
                }}
              >
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  sizes="25vw"
                  priority={isCenter}
                />
                {/* Gradient overlay at bottom for name */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "200px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "32px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {doctor.name}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.8)",
                      marginTop: "4px",
                      fontStyle: "italic",
                    }}
                  >
                    {doctor.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation arrows — floating over carousel */}
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: isMobile ? "calc(50% - 60px)" : "72px",
            top: isMobile ? "auto" : "50%",
            bottom: isMobile ? "50px" : "auto",
            transform: isMobile ? "none" : "translateY(-50%)",
            width: isMobile ? "48px" : "56px",
            height: isMobile ? "48px" : "56px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            zIndex: 20,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = isMobile
              ? "scale(1.08)"
              : "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = isMobile
              ? "none"
              : "translateY(-50%) scale(1)";
          }}
          aria-label="Previous doctor"
        >
          <svg
            width="22"
            height="22"
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
            position: "absolute",
            right: isMobile ? "auto" : "72px",
            left: isMobile ? "calc(50% + 12px)" : "auto",
            top: isMobile ? "auto" : "50%",
            bottom: isMobile ? "50px" : "auto",
            transform: isMobile ? "none" : "translateY(-50%)",
            width: isMobile ? "48px" : "56px",
            height: isMobile ? "48px" : "56px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            zIndex: 20,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = isMobile
              ? "scale(1.08)"
              : "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = isMobile
              ? "none"
              : "translateY(-50%) scale(1)";
          }}
          aria-label="Next doctor"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0F1A2D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "16px" : "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 20,
        }}
      >
        {doctors.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === currentIndex ? "32px" : "10px",
              height: "10px",
              borderRadius: i === currentIndex ? "5px" : "50%",
              backgroundColor: i === currentIndex ? "#0168FF" : "#D1D5DB",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            aria-label={`Go to doctor ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
