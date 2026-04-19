import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

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

export default async function ServicesPage() {
  let services: ServiceItem[] = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }

  return (
    <div style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Header */}
      <section className="section-px" style={{ paddingTop: "60px" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#0168FF",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "12px",
          }}
        >
          Serviciile Noastre
        </p>
        <h1
          className="text-[36px] md:text-[44px] lg:text-[52px]"
          style={{
            fontWeight: 300,
            color: "#0F1A2D",
            margin: "0 0 16px 0",
            lineHeight: 1.15,
          }}
        >
          Totul pentru{" "}
          <span style={{ fontStyle: "italic", fontWeight: 700 }}>
            zâmbetul tău.
          </span>
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#878C96",
            maxWidth: "600px",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          De la prevenție la implantologie avansată — oferim o gamă completă de
          servicii stomatologice cu echipamente moderne și o echipă dedicată.
        </p>
      </section>

      {/* Services Grid */}
      <section
        className="section-px"
        style={{ paddingTop: "48px", paddingBottom: "80px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const isDark =
              service.cardColor === "#0F1A2D" ||
              service.cardColor === "#0168FF";
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card"
                style={{
                  display: "flex",
                  flexDirection: isEven ? "row" : "row-reverse",
                  backgroundColor: service.cardColor,
                  borderRadius: "32px",
                  overflow: "hidden",
                  textDecoration: "none",
                  height: "70vh",
                  minHeight: "500px",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                    minHeight: "250px",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: service.imagePosition }}
                    sizes="50vw"
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "32px 24px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isDark ? "rgba(255,255,255,0.5)" : "#0168FF",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "12px",
                    }}
                  >
                    {service.subtitle}
                  </p>
                  <h2
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: isDark ? "#FFFFFF" : "#0F1A2D",
                      margin: "0 0 16px 0",
                      lineHeight: 1.2,
                    }}
                  >
                    {service.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "15px",
                      color: isDark ? "rgba(255,255,255,0.6)" : "#878C96",
                      lineHeight: 1.7,
                      margin: "0 0 24px 0",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2"
                    style={{
                      gap: "12px",
                      marginBottom: "32px",
                    }}
                  >
                    {service.features.map((feature, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "13px",
                            color: isDark ? "rgba(255,255,255,0.8)" : "#0F1A2D",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isDark ? "#FFFFFF" : "#0168FF"}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feature.title}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: isDark ? "#FFFFFF" : "#0168FF",
                    }}
                  >
                    Află mai multe
                    <ArrowIcon />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
