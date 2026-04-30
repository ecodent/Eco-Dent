import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import TeamCarousel from "./TeamCarousel";
import BeforeAfter from "./BeforeAfter";
import PatientReviews from "./PatientReviews";
import HeroSlider from "./HeroSlider";
import Footer from "./Footer";
import Contact from "./Contact";
import Navbar from "./Navbar";
import { T } from "./i18n/LanguageProvider";
import {
  getTeamMembers,
  getServices,
  getReviews,
  getBeforeAfterCases,
  getHeroImages,
  getSiteSettings,
} from "@/lib/data";

export const dynamic = "force-dynamic"; // layout reads cookies → route is dynamic; data is cached via unstable_cache in lib/data.ts

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

  let teamMembers,
    reviews,
    beforeAfterCases,
    heroImages,
    services,
    siteSettings;
  try {
    [
      teamMembers,
      reviews,
      beforeAfterCases,
      heroImages,
      services,
      siteSettings,
    ] = await Promise.all([
      getTeamMembers(),
      getReviews(),
      getBeforeAfterCases(),
      getHeroImages(),
      getServices(),
      getSiteSettings(),
    ]);
  } catch {
    teamMembers = [];
    reviews = [];
    beforeAfterCases = [];
    heroImages = [];
    services = [];
    siteSettings = {};
  }

  // Use fallback if DB returned empty
  if (!teamMembers || teamMembers.length === 0) teamMembers = defaultTeam;
  if (!heroImages || heroImages.length === 0) heroImages = defaultHero;
  if (!services || services.length === 0) services = [];

  const cookieLang = (await cookies()).get("ecodent.lang")?.value ?? "ro";

  // Resolve RU fields for services when language is Russian
  if (cookieLang === "ru") {
    services = services.map((svc: any) => ({
      ...svc,
      title: svc.title_ru || svc.title,
      subtitle: svc.subtitle_ru || svc.subtitle,
    }));
  }

  const sr = siteSettings as Record<string, string> | null;

  const sBase = {
    heroTitle: "Îngrijire Dentară",
    heroTitleItalic: "Avansată",
    heroTitle2: "în care",
    heroTitle3: "Poți Avea Încredere.",
    heroDescription:
      "Diagnostic digital, proceduri minim invazive şi rezultate predictibile la fiecare etapă a tratamentului.",
    heroCta: "Programează o Consultație",
    heroPhone: "+373 69 100 200",
    stat1Value: "100%",
    stat1Label: "Diagnostic Digital & Radiologie",
    stat2Value: "5K+",
    stat2Label: "Pacienți Tratați cu Grijă",
    stat3Value: "10+",
    stat3Label: "Ani Experiență Clinică",
    ...siteSettings,
  };

  const s =
    cookieLang === "ru"
      ? {
          ...sBase,
          heroTitle: sr?.heroTitle_ru || "Современная",
          heroTitleItalic: sr?.heroTitleItalic_ru || "Стоматология",
          heroTitle2: sr?.heroTitle2_ru || "которой Вы",
          heroTitle3: sr?.heroTitle3_ru || "Можете Доверять.",
          heroDescription:
            sr?.heroDescription_ru ||
            "Цифровая диагностика, малоинвазивные процедуры и предсказуемые результаты на каждом этапе лечения.",
          heroCta: sr?.heroCta_ru || "Записаться на консультацию",
          stat1Label: sr?.stat1Label_ru || "Цифровая Диагностика & Рентген",
          stat2Label: sr?.stat2Label_ru || "Пациентов с Заботой",
          stat3Label: sr?.stat3Label_ru || "Лет Клинического Опыта",
          servicesTitle: sr?.servicesTitle_ru || "Наши",
          servicesTitleItalic: sr?.servicesTitleItalic_ru || "Услуги.",
          servicesDescription:
            sr?.servicesDescription_ru ||
            "Сочетаем клинический опыт, современные технологии и внимательный подход.",
          servicesCta: sr?.servicesCta_ru || "Подробнее",
          teamTitle: sr?.teamTitle_ru || "Наша медицинская",
          teamTitleItalic: sr?.teamTitleItalic_ru || "Команда.",
          teamDescription:
            sr?.teamDescription_ru ||
            "Команда опытных стоматологов, ориентированных на точное лечение и долгосрочные результаты.",
          baTitle: sr?.baTitle_ru || "До и",
          baTitleItalic: sr?.baTitleItalic_ru || "После.",
          baDescription:
            sr?.baDescription_ru ||
            "Каждый случай отражает тщательно спланированный подход.",
          baCta: sr?.baCta_ru || "Записаться на приём",
          reviewsTitle: sr?.reviewsTitle_ru || "Отзывы",
          reviewsTitleItalic: sr?.reviewsTitleItalic_ru || "Пациентов.",
          reviewsDescription:
            sr?.reviewsDescription_ru ||
            "Опыт людей, прошедших лечение в нашей клинике.",
          contactAddress:
            sr?.contactAddress_ru ||
            "ул. Григоре Виеру 11,\nШтефан Водэ, Молдова",
          contactHours:
            sr?.contactHours_ru ||
            "Понедельник – Пятница: 09:00 – 19:00\nСуббота: 09:00 – 14:00",
        }
      : sBase;
  if (!reviews || reviews.length === 0) reviews = defaultReviews;
  if (!beforeAfterCases || beforeAfterCases.length === 0)
    beforeAfterCases = defaultCases;

  const heroImageUrls = heroImages.map((h: { url: string }) => h.url);
  const firstHeroUrl = heroImageUrls[0] ?? null;

  const partners = [
    { name: "dLab", icon: "◈" },
    { name: "Magnolia", icon: "❋" },
    { name: "Powersurge", icon: "▣" },
    { name: "Warpspeed", icon: "◆" },
    { name: "Leapyear", icon: "△" },
  ];

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      {/* Hero Section — full viewport */}
      <div className="relative flex flex-col lg:block lg:min-h-[92vh] xl:min-h-screen">
        {/* Hero Image — behind navbar on desktop */}
        <div
          className="relative lg:absolute w-full lg:w-[35%] xl:w-[40%] h-[42vh] md:h-[52vh] lg:h-auto lg:aspect-[0.9/1] xl:h-[80vh] xl:aspect-auto order-2 lg:order-none lg:left-[79%] lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 xl:left-[72.5%] xl:-translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2"
          style={{
            zIndex: 1,
            marginTop: "8px",
            marginBottom: "4px",
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-none lg:rounded-[40px]">
            {/* First image rendered server-side — no JS needed, LCP element */}
            {firstHeroUrl && (
              <Image
                src={firstHeroUrl}
                alt="ECODENT Dental Clinic"
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 35vw, 100vw"
                quality={85}
              />
            )}
            {/* Slider handles transitions for images 2+ and eventually overlays image 1 */}
            {heroImageUrls.length > 1 && <HeroSlider images={heroImageUrls} />}

            {/* Stats Cards */}
            <div
              className="absolute hidden xl:flex"
              style={{
                bottom: "24px",
                left: "24px",
                right: "24px",
                gap: "10px",
              }}
            >
              {/* 100% Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "16px 18px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  flex: "1 1 0",
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(14px, 1.6vw, 32px)",
                    fontWeight: 700,
                    color: "#0168FF",
                    lineHeight: 1.1,
                  }}
                >
                  {s.stat1Value}
                </p>
                <p
                  style={{
                    fontSize: "clamp(9px, 0.75vw, 12px)",
                    color: "#878C96",
                    marginTop: "6px",
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {s.stat1Label}
                </p>
              </div>

              {/* 5K+ Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "16px 18px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  flex: "1 1 0",
                  minWidth: 0,
                }}
              >
                <div className="flex items-center justify-between">
                  <p
                    style={{
                      fontSize: "clamp(14px, 1.6vw, 32px)",
                      fontWeight: 700,
                      color: "#0F1A2D",
                      lineHeight: 1.1,
                    }}
                  >
                    {s.stat2Value}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "clamp(9px, 0.75vw, 12px)",
                    color: "#878C96",
                    marginTop: "6px",
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {s.stat2Label}
                </p>
              </div>

              {/* 10+ Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "16px 18px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  flex: "1 1 0",
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(14px, 1.6vw, 32px)",
                    fontWeight: 700,
                    color: "#0F1A2D",
                    lineHeight: 1.1,
                  }}
                >
                  {s.stat3Value}
                </p>
                <p
                  style={{
                    fontSize: "clamp(9px, 0.75vw, 12px)",
                    color: "#878C96",
                    marginTop: "6px",
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {s.stat3Label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Navbar — on top of hero image */}
        <Navbar />

        {/* Left Content */}
        <main
          className="relative z-10 section-px order-1 lg:order-none lg:w-[58%] xl:w-[45%] lg:min-h-[92vh] xl:min-h-screen lg:flex lg:items-center"
          style={{ paddingTop: "100px", paddingBottom: "40px" }}
        >
          <div className="max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]">
            <h1
              className="text-[36px] sm:text-[48px] lg:text-[46px] xl:text-[64px]"
              style={{
                lineHeight: 1.05,
                fontWeight: 900,
                color: "#0F1A2D",
                letterSpacing: "-0.02em",
              }}
            >
              {s.heroTitle}
              <br />
              <span style={{ fontWeight: 700 }}>{s.heroTitleItalic}</span>{" "}
              {s.heroTitle2}
              <br />
              {s.heroTitle3}
            </h1>

            <p
              className="text-[15px] sm:text-[16px] xl:text-[17px]"
              style={{
                marginTop: "20px",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "#878C96",
              }}
            >
              {s.heroDescription}
            </p>

            <a
              href="#contact-form"
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
              {s.heroCta}
              <ArrowIcon />
            </a>

            {/* Partners */}
            <div
              className="hidden xl:flex items-center"
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
        {/* Header: title + description + CTA */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between"
          style={{ gap: "24px", marginBottom: "48px" }}
        >
          <div style={{ maxWidth: "640px" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0168FF",
                marginBottom: "16px",
              }}
            >
              {cookieLang === "ru" ? "Наши Услуги" : "Serviciile Noastre"}
            </span>
            <h2
              className="text-[32px] md:text-[42px] lg:text-[52px]"
              style={{
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#0F1A2D",
                letterSpacing: "-0.02em",
              }}
            >
              {s.servicesTitle || "Serviciile"}{" "}
              <span style={{ fontWeight: 700 }}>
                {s.servicesTitleItalic || "Noastre."}
              </span>
            </h2>
            <p
              style={{
                marginTop: "20px",
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#5A6271",
                maxWidth: "560px",
              }}
            >
              {s.servicesDescription ||
                "Combinăm experiența clinică, tehnologia modernă și o abordare atentă pentru a oferi rezultate de încredere în stomatologia preventivă, restaurativă și estetică."}
            </p>
          </div>

          <a
            href={`/${cookieLang}/servicii`}
            className="inline-flex items-center hover:opacity-80 transition-opacity self-start lg:self-end"
            style={{
              gap: "10px",
              backgroundColor: "#0F1A2D",
              color: "#FFFFFF",
              padding: "16px 32px",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: 500,
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            {s.servicesCta || "Toate Serviciile"}
            <ArrowIcon />
          </a>
        </div>

        {/* Unified card grid: 1 col mobile / 2 cols sm / 3 cols lg */}
        <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-3 gap-5">
          {services
            .slice(0, 6)
            .map(
              (svc: {
                slug: string;
                title: string;
                subtitle: string;
                image: string;
                imagePosition?: string;
                cardColor: string;
              }) => {
                const isDark =
                  svc.cardColor === "#0F1A2D" || svc.cardColor === "#0168FF";
                return (
                  <Link
                    key={svc.slug}
                    href={`/${cookieLang}/servicii/${svc.slug}`}
                    className="service-card group"
                    style={{
                      backgroundColor: isDark ? svc.cardColor : "#FFFFFF",
                      borderRadius: "24px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      boxShadow: "0 1px 3px rgba(15, 26, 45, 0.04)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      border: isDark ? "none" : "1px solid #ECEEF1",
                    }}
                  >
                    {/* Image */}
                    {svc.image && (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "4 / 3",
                          overflow: "hidden",
                          backgroundColor: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "#F4F5F7",
                        }}
                      >
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{
                            objectPosition: svc.imagePosition || "center 30%",
                          }}
                          sizes="(max-width: 560px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div
                      style={{
                        padding: "20px 22px 22px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        flex: 1,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "17px",
                          fontWeight: 600,
                          lineHeight: 1.3,
                          letterSpacing: "-0.01em",
                          color: isDark ? "#FFFFFF" : "#0F1A2D",
                          margin: 0,
                        }}
                      >
                        {svc.title}
                      </h3>
                      {svc.subtitle && (
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: 1.5,
                            color: isDark
                              ? "rgba(255,255,255,0.65)"
                              : "#878C96",
                            margin: 0,
                            flex: 1,
                          }}
                        >
                          {svc.subtitle}
                        </p>
                      )}

                      {/* Footer link with arrow */}
                      <div
                        className="flex items-center justify-between"
                        style={{
                          marginTop: "12px",
                          paddingTop: "14px",
                          borderTop: isDark
                            ? "1px solid rgba(255,255,255,0.12)"
                            : "1px solid #ECEEF1",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: isDark ? "#FFFFFF" : "#0168FF",
                          }}
                        >
                          {cookieLang === "ru" ? "Подробнее" : "Vezi detalii"}
                        </span>
                        <span
                          className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "9999px",
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.12)"
                              : "#F4F5F7",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isDark ? "#FFFFFF" : "#0F1A2D"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              },
            )}
        </div>
      </section>

      {/* Team Section */}
      <TeamCarousel
        doctors={teamMembers}
        title={s.teamTitle}
        titleItalic={s.teamTitleItalic}
        description={s.teamDescription}
        lang={cookieLang}
      />

      {/* Before & After Section */}
      <BeforeAfter
        cases={beforeAfterCases}
        title={s.baTitle}
        titleItalic={s.baTitleItalic}
        description={s.baDescription}
        cta={s.baCta}
        lang={cookieLang}
      />

      {/* Patient Reviews Section */}
      <PatientReviews
        reviews={reviews}
        title={s.reviewsTitle}
        titleItalic={s.reviewsTitleItalic}
        description={s.reviewsDescription}
        lang={cookieLang}
      />

      {/* Contact Section */}
      <Contact
        phone={s.contactPhone}
        email={s.contactEmail}
        address={s.contactAddress}
        hours={s.contactHours}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
