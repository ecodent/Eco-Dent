"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

interface ReviewItem {
  name: string;
  image: string;
  grade: number;
  text: string;
}

interface PatientReviewsProps {
  reviews: ReviewItem[];
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

export default function PatientReviews({ reviews }: PatientReviewsProps) {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const CARD_W = isMobile ? 90 : 60;
  const SIDE_W = isMobile ? 0 : 18;
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
        height: isMobile ? "auto" : "100vh",
        minHeight: isMobile ? "600px" : "800px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F8F8F8",
        overflow: "hidden",
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
          alignItems: "flex-start",
          gap: isMobile ? "16px" : "0",
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
            Patient{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700 }}>
              Reviews.
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
            Experiences from{" "}
            <span style={{ fontWeight: 600, color: "#0F1A2D" }}>people</span>{" "}
            who completed treatment with our team. Clear{" "}
            <span
              style={{
                fontWeight: 600,
                color: "#0F1A2D",
                fontStyle: "italic",
              }}
            >
              communication
            </span>
            , careful work, and{" "}
            <span style={{ fontWeight: 600, color: "#0F1A2D" }}>results</span>{" "}
            that look natural in{" "}
            <span
              style={{
                fontWeight: 600,
                color: "#0F1A2D",
                fontStyle: "italic",
              }}
            >
              everyday
            </span>{" "}
            life.
          </p>
        </div>

        {/* Right: reviews count */}
        <div style={{ textAlign: "right" }}>
          <span
            style={{
              fontSize: "13px",
              color: "#878C96",
              letterSpacing: "0.04em",
            }}
          >
            reviews/
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
                  Grade
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
                Grade
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
                height: "280px",
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
              <span style={{ fontSize: "11px", color: "#878C96" }}>Grade</span>
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

        {/* < white button — top-left, outside center card (inverted from BA's > at top-right) */}
        <button
          onClick={prev}
          style={{
            position: "absolute",
            top: "12px",
            left: isMobile ? "12px" : `calc(${SIDE_W + SIDE_GAP}vw - 56px)`,
            width: isMobile ? "40px" : "48px",
            height: isMobile ? "40px" : "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.9)",
            border: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            transition: "transform 0.2s",
            backdropFilter: "blur(8px)",
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

        {/* > blue button — bottom-right, outside center card (inverted from BA's < at bottom-left) */}
        <button
          onClick={next}
          style={{
            position: "absolute",
            bottom: "52px",
            right: isMobile ? "12px" : `calc(${SIDE_W + SIDE_GAP}vw - 60px)`,
            width: isMobile ? "44px" : "52px",
            height: isMobile ? "44px" : "52px",
            borderRadius: "50%",
            backgroundColor: "#0168FF",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            boxShadow: "0 6px 24px rgba(1,104,255,0.4)",
            transition: "transform 0.2s",
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
    </section>
  );
}
