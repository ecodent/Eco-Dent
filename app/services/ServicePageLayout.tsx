"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../Footer";

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

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="ECODENT"
        width={160}
        height={67}
        unoptimized
        style={{ width: "160px", height: "auto" }}
      />
    </Link>
  );
}

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
  ctaText = "Programează-te acum",
}: ServicePageLayoutProps) {
  return (
    <div style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="w-full flex items-center section-px"
        style={{ paddingTop: "28px", paddingBottom: "28px" }}
      >
        <Logo />
        <div
          className="hidden md:flex items-center"
          style={{ gap: "40px", marginLeft: "64px" }}
        >
          <Link
            href="/"
            className="font-medium hover:opacity-70 transition-opacity"
            style={{
              fontSize: "15px",
              color: "#878C96",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Link
            href="/#services"
            className="font-medium hover:opacity-70 transition-opacity"
            style={{
              fontSize: "15px",
              color: "#0F1A2D",
              textDecoration: "none",
            }}
          >
            Dental Services
          </Link>
          <Link
            href="/#team"
            className="font-medium hover:opacity-70 transition-opacity"
            style={{
              fontSize: "15px",
              color: "#878C96",
              textDecoration: "none",
            }}
          >
            Our Team
          </Link>
        </div>
        <Link
          href="/#contact"
          className="hidden md:flex items-center font-medium hover:shadow-lg transition-shadow"
          style={{
            gap: "10px",
            padding: "14px 28px",
            borderRadius: "9999px",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            color: "#0F1A2D",
            fontSize: "15px",
            marginLeft: "auto",
            textDecoration: "none",
          }}
        >
          <PhoneIcon />
          Contact
        </Link>
      </nav>

      {/* Hero Banner */}
      <section className="section-px" style={{ marginTop: "16px" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            height: "300px",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition: imagePosition }}
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(15,26,45,0.85) 0%, rgba(15,26,45,0.4) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "32px",
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#0168FF",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </p>
            <h1
              className="text-[32px] md:text-[42px] lg:text-[52px]"
              style={{
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: "12px",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Description */}
      <section
        className="section-px"
        style={{ paddingTop: "60px", maxWidth: "900px", margin: "0 auto" }}
      >
        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.8,
            color: "#878C96",
            textAlign: "center",
          }}
        >
          {description}
        </p>
      </section>

      {/* Features Grid */}
      <section className="section-px" style={{ paddingTop: "64px" }}>
        <h2
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#0F1A2D",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          Ce include acest serviciu
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                padding: "36px 32px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#EBF2FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0168FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#0F1A2D",
                  marginBottom: "10px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{ fontSize: "14px", lineHeight: 1.7, color: "#878C96" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-px" style={{ paddingTop: "60px" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "#0F1A2D",
            borderRadius: "32px",
            padding: "40px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "32px",
              }}
            >
              De ce să alegi ECODENT?
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#0168FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="hidden md:block"
            style={{
              position: "relative",
              width: "240px",
              height: "280px",
              borderRadius: "24px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="240px"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-px"
        style={{
          paddingTop: "60px",
          paddingBottom: "80px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#0F1A2D",
            marginBottom: "16px",
          }}
        >
          Ești gata să faci primul pas?
        </h2>
        <p style={{ fontSize: "16px", color: "#878C96", marginBottom: "36px" }}>
          Contactează-ne pentru o programare sau pentru mai multe detalii.
        </p>
        <Link
          href="/#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#0168FF",
            color: "#FFFFFF",
            padding: "18px 40px",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {ctaText}
          <svg
            width="20"
            height="20"
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
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
