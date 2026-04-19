import Image from "next/image";
import Link from "next/link";
import TeamCarousel from "./TeamCarousel";
import BeforeAfter from "./BeforeAfter";
import PatientReviews from "./PatientReviews";
import HeroSlider from "./HeroSlider";
import Footer from "./Footer";
import Contact from "./Contact";
import Navbar from "./Navbar";
import {
  getTeamMembers,
  getServices,
  getReviews,
  getBeforeAfterCases,
  getHeroImages,
} from "@/lib/data";

export const dynamic = "force-dynamic";

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

function ArrowIcon() {
  return (
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
  );
}

function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="ECODENT"
        width={160}
        height={67}
        unoptimized
        style={{ width: "160px", height: "auto" }}
      />
    </div>
  );
}

export default async function Home() {
  // Default/fallback data
  const defaultTeam = [
    {
      name: "Dr. Emilia Rossi",
      role: "Cosmetic Dentist",
      image: "/medic1.png",
    },
    { name: "Dr. Adrian Novak", role: "Implantologist", image: "/medic2.png" },
    { name: "Dr. Lukas Meyer", role: "Lead Dentist", image: "/medic3.jpg" },
    { name: "Dr. Sofia Chen", role: "Orthodontist", image: "/medic4.jpg" },
    { name: "Dr. Marcus Reid", role: "Oral Surgeon", image: "/medic 5.jpg" },
  ];
  const defaultHero = [
    { url: "/clinica1.jpg" },
    { url: "/clinica222.png" },
    { url: "/clinica33.png" },
  ];
  const defaultReviews = [
    {
      name: "Sherri K.",
      image: "/patient-1.jpg",
      grade: 5.0,
      text: '"Wonderful experience from start to finish. The staff was incredibly warm and the procedure was completely painless. I finally feel confident about my smile."',
    },
    {
      name: "Anna M.",
      image: "/patient-2.jpg",
      grade: 5.0,
      text: '"I used to feel anxious before dental visits. Here everything **felt calm** and clearly explained. The treatment was **gentle**, and I\'m really happy with **how natural** my smile looks now."',
    },
    {
      name: "Ron B.",
      image: "/patient-3.jpg",
      grade: 4.5,
      text: '"Professional team with great attention to detail. The results exceeded my expectations and the whole process was smooth and well-organized."',
    },
    {
      name: "Maria D.",
      image: "/patient-4.jpg",
      grade: 5.0,
      text: "\"Best dental clinic I've ever been to. The doctors take their time to explain everything and make sure you're comfortable throughout the treatment.\"",
    },
  ];
  const defaultCases = [
    {
      before: "/before11.png",
      after: "/after11.png",
      label: "Teeth Whitening",
    },
    { before: "/smile-2.jpg", after: "/smile-2.jpg", label: "Dental Veneers" },
    {
      before: "/smile-3.jpg",
      after: "/smile-3.jpg",
      label: "Full Restoration",
    },
  ];

  let teamMembers, reviews, beforeAfterCases, heroImages;
  try {
    [teamMembers, reviews, beforeAfterCases, heroImages] = await Promise.all([
      getTeamMembers(),
      getReviews(),
      getBeforeAfterCases(),
      getHeroImages(),
    ]);
  } catch {
    teamMembers = [];
    reviews = [];
    beforeAfterCases = [];
    heroImages = [];
  }

  // Use fallback if DB returned empty
  if (!teamMembers || teamMembers.length === 0) teamMembers = defaultTeam;
  if (!heroImages || heroImages.length === 0) heroImages = defaultHero;
  if (!reviews || reviews.length === 0) reviews = defaultReviews;
  if (!beforeAfterCases || beforeAfterCases.length === 0)
    beforeAfterCases = defaultCases;

  const heroImageUrls = heroImages.map((h: { url: string }) => h.url);

  const partners = [
    { name: "dLab", icon: "◈" },
    { name: "Magnolia", icon: "❋" },
    { name: "Powersurge", icon: "▣" },
    { name: "Warpspeed", icon: "◆" },
    { name: "Leapyear", icon: "△" },
  ];

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section — full viewport */}
      <div
        className="relative flex flex-col lg:block"
        style={{
          minHeight: "auto",
        }}
      >
        {/* Hero Image */}
        <div
          className="relative lg:absolute w-full lg:w-[55%] h-[50vh] md:h-[60vh] lg:h-[calc(100vh-32px)] order-2 lg:order-none"
          style={{
            right: "16px",
            top: "0px",
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-[20px] lg:rounded-[40px]">
            <HeroSlider images={heroImageUrls} />

            {/* Stats Cards */}
            <div
              className="absolute flex-col sm:flex-row hidden md:flex"
              style={{
                bottom: "32px",
                left: "32px",
                right: "32px",
                gap: "12px",
              }}
            >
              {/* 100% Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "18px 22px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  minWidth: "140px",
                  flex: "1",
                }}
              >
                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#0168FF",
                  }}
                >
                  100%
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#878C96",
                    marginTop: "6px",
                    lineHeight: 1.4,
                  }}
                >
                  Digital
                  <br />
                  X-Ray &amp; Diagnostics
                </p>
              </div>

              {/* 5K+ Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "18px 22px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  minWidth: "140px",
                  flex: "1",
                }}
              >
                <div className="flex items-center justify-between">
                  <p
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#0F1A2D",
                    }}
                  >
                    5K+
                  </p>
                  <div className="flex">
                    <Image
                      src="/hero-image.jpg"
                      alt="Patient"
                      width={28}
                      height={28}
                      className="object-cover"
                      style={{
                        borderRadius: "50%",
                        border: "2px solid white",
                        marginLeft: "-8px",
                      }}
                    />
                    <Image
                      src="/hero-image.jpg"
                      alt="Patient"
                      width={28}
                      height={28}
                      className="object-cover"
                      style={{
                        borderRadius: "50%",
                        border: "2px solid white",
                        marginLeft: "-8px",
                      }}
                    />
                    <Image
                      src="/hero-image.jpg"
                      alt="Patient"
                      width={28}
                      height={28}
                      className="object-cover"
                      style={{
                        borderRadius: "50%",
                        border: "2px solid white",
                        marginLeft: "-8px",
                      }}
                    />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#878C96",
                    marginTop: "6px",
                    lineHeight: 1.4,
                  }}
                >
                  Patients
                  <br />
                  Treated With Care
                </p>
              </div>

              {/* 10+ Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "18px 22px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  minWidth: "140px",
                  flex: "1",
                }}
              >
                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#0F1A2D",
                  }}
                >
                  10+
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#878C96",
                    marginTop: "6px",
                    lineHeight: 1.4,
                  }}
                >
                  Years
                  <br />
                  Clinical Experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Content */}
        <main
          className="relative z-10 section-px order-1 lg:order-none"
          style={{ paddingTop: "40px", paddingBottom: "40px" }}
        >
          <div className="max-w-[480px]">
            <h1
              className="text-[36px] sm:text-[48px] lg:text-[64px]"
              style={{
                lineHeight: 1.05,
                fontWeight: 300,
                color: "#0F1A2D",
                letterSpacing: "-0.02em",
              }}
            >
              Advanced
              <br />
              <span style={{ fontWeight: 700, fontStyle: "italic" }}>
                Dental Care
              </span>{" "}
              You
              <br />
              Can Trust.
            </h1>

            <p
              style={{
                marginTop: "32px",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "#878C96",
                maxWidth: "420px",
              }}
            >
              Digital{" "}
              <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                diagnostics
              </span>
              , minimally invasive procedures, and predictable outcomes at{" "}
              <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                every stage
              </span>{" "}
              of treatment.
            </p>

            <a
              href="#"
              className="inline-flex items-center hover:opacity-90 transition-opacity"
              style={{
                marginTop: "40px",
                gap: "10px",
                backgroundColor: "#0168FF",
                color: "#FFFFFF",
                padding: "18px 36px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Get A Consultation
              <ArrowIcon />
            </a>

            {/* Partners */}
            <div
              className="hidden lg:flex items-center"
              style={{ marginTop: "100px", gap: "36px", opacity: 0.4 }}
            >
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center"
                  style={{ gap: "8px", color: "#878C96" }}
                >
                  <span style={{ fontSize: "16px" }}>{partner.icon}</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {/* End of Hero Section */}

      {/* Services Section */}
      <section
        className="section-px section-py"
        style={{
          backgroundColor: "#F8F8F8",
          position: "relative",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            gap: "16px",
          }}
        >
          {/* ===== LEFT COLUMN: Text + 1 Service Card ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Text Block — top part */}
            <div style={{ paddingTop: "8px" }}>
              <h2
                className="text-[32px] md:text-[42px] lg:text-[52px]"
                style={{
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "#0F1A2D",
                  letterSpacing: "-0.02em",
                }}
              >
                Our{" "}
                <span style={{ fontStyle: "italic", fontWeight: 700 }}>
                  Services.
                </span>
              </h2>
              <p
                style={{
                  marginTop: "24px",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#878C96",
                  maxWidth: "400px",
                }}
              >
                We combine{" "}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  clinical experience
                </span>
                , modern{" "}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  technology
                </span>
                , and a thoughtful{" "}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  approach
                </span>{" "}
                to deliver reliable{" "}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  results
                </span>{" "}
                across preventive, restorative, and{" "}
                <span style={{ fontWeight: 600, color: "#0F1A2D" }}>
                  aesthetic
                </span>{" "}
                dentistry.
              </p>
              <a
                href="#"
                className="inline-flex items-center hover:opacity-80 transition-opacity"
                style={{
                  marginTop: "32px",
                  gap: "10px",
                  backgroundColor: "#0F1A2D",
                  color: "#FFFFFF",
                  padding: "16px 32px",
                  borderRadius: "9999px",
                  fontSize: "15px",
                  fontWeight: 500,
                  width: "fit-content",
                }}
              >
                Learn More
                <ArrowIcon />
              </a>
            </div>

            {/* Two service cards side by side */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              style={{
                minHeight: "260px",
                flexShrink: 0,
              }}
            >
              {/* Examinations */}
              <Link
                href="/services/examinations"
                style={{
                  backgroundColor: "#ECEEF1",
                  borderRadius: "24px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                }}
                className="service-card"
              >
                <div style={{ padding: "20px 20px 0" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#0F1A2D",
                    }}
                  >
                    Examinations
                  </h3>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#878C96",
                      marginTop: "4px",
                      lineHeight: 1.4,
                    }}
                  >
                    Accurate diagnostics and regular checkups.
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                    marginTop: "10px",
                    minHeight: "100px",
                  }}
                >
                  <Image
                    src="/radiografie-tomografie dentară.jpg"
                    alt="Examinations"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                    sizes="15vw"
                  />
                </div>
              </Link>

              {/* Preventive Care */}
              <Link
                href="/services/preventive-care"
                style={{
                  backgroundColor: "#ECEEF1",
                  borderRadius: "24px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                }}
                className="service-card"
              >
                <div style={{ padding: "20px 20px 0" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#0F1A2D",
                    }}
                  >
                    Preventive Care
                  </h3>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#878C96",
                      marginTop: "4px",
                      lineHeight: 1.4,
                    }}
                  >
                    Cleaning, scaling and gum protection.
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                    marginTop: "10px",
                    minHeight: "100px",
                  }}
                >
                  <Image
                    src="/Igienizare profesională.jpg"
                    alt="Preventive Care"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                    sizes="15vw"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: 4 Service Cards (2x2, equal rows) ===== */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            style={{
              minHeight: "auto",
            }}
          >
            {/* Teeth Whitening — top left, dark */}
            <Link
              href="/services/teeth-whitening"
              style={{
                backgroundColor: "#0F1A2D",
                borderRadius: "24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
              }}
              className="service-card"
            >
              <div
                style={{ flex: 1, position: "relative", minHeight: "140px" }}
              >
                <Image
                  src="/albire dentară.jpg"
                  alt="Teeth Whitening"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 40%" }}
                  sizes="20vw"
                />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  Teeth Whitening
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "6px",
                    lineHeight: 1.5,
                  }}
                >
                  Safe whitening for a brighter smile.
                </p>
              </div>
            </Link>

            {/* Orthodontics — top right, light */}
            <Link
              href="/services/orthodontics"
              style={{
                backgroundColor: "#ECEEF1",
                borderRadius: "24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
              }}
              className="service-card"
            >
              <div style={{ padding: "24px 24px 0" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0F1A2D",
                  }}
                >
                  Orthodontics
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#878C96",
                    marginTop: "6px",
                    lineHeight: 1.5,
                  }}
                >
                  Teeth alignment for lasting results.
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  marginTop: "14px",
                  minHeight: "140px",
                }}
              >
                <Image
                  src="/service-coroane,punti.png"
                  alt="Orthodontics"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 30%" }}
                  sizes="20vw"
                />
              </div>
            </Link>

            {/* Oral Surgery — bottom left, blue */}
            <Link
              href="/services/oral-surgery"
              style={{
                backgroundColor: "#0168FF",
                borderRadius: "24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
              }}
              className="service-card"
            >
              <div
                style={{ flex: 1, position: "relative", minHeight: "110px" }}
              >
                <Image
                  src="/terapie și endodonție.png"
                  alt="Oral Surgery"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 30%" }}
                  sizes="20vw"
                />
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  Oral Surgery
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.7)",
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  Modern surgical care.
                </p>
              </div>
            </Link>

            {/* Dental Implants — bottom right, light */}
            <Link
              href="/services/dental-implants"
              style={{
                backgroundColor: "#ECEEF1",
                borderRadius: "24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
              }}
              className="service-card"
            >
              <div
                style={{ flex: 1, position: "relative", minHeight: "110px" }}
              >
                <Image
                  src="/dantura fixa pe implanturi.jpg"
                  alt="Dental Implants"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 30%" }}
                  sizes="20vw"
                />
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#0F1A2D",
                  }}
                >
                  Dental Implants
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#878C96",
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  Permanent tooth solutions.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamCarousel doctors={teamMembers} />

      {/* Before & After Section */}
      <BeforeAfter cases={beforeAfterCases} />

      {/* Patient Reviews Section */}
      <PatientReviews reviews={reviews} />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
