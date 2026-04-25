import mongoose, { Schema } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    // Hero texts
    heroTitle: { type: String, default: "Îngrijire Dentară" },
    heroTitleItalic: { type: String, default: "Avansată" },
    heroTitle2: { type: String, default: "în care" },
    heroTitle3: { type: String, default: "Poți Avea Încredere." },
    heroDescription: {
      type: String,
      default:
        "Diagnostic digital, proceduri minim invazive și rezultate predictibile la fiecare etapă a tratamentului.",
    },
    heroCta: { type: String, default: "Programează o Consultație" },
    heroPhone: { type: String, default: "+373 69 100 200" },

    // Stats cards on hero image
    stat1Value: { type: String, default: "100%" },
    stat1Label: { type: String, default: "Diagnostic Digital & Radiologie" },
    stat2Value: { type: String, default: "5K+" },
    stat2Label: { type: String, default: "Pacienți Tratați cu Grijă" },
    stat3Value: { type: String, default: "10+" },
    stat3Label: { type: String, default: "Ani Experiență Clinică" },

    // Services section (home page)
    servicesTitle: { type: String, default: "Serviciile" },
    servicesTitleItalic: { type: String, default: "Noastre." },
    servicesDescription: {
      type: String,
      default:
        "Combinăm experiența clinică, tehnologia modernă și o abordare atentă pentru a oferi rezultate de încredere în stomatologia preventivă, restaurativă și estetică.",
    },
    servicesCta: { type: String, default: "Află Mai Multe" },

    // Team section
    teamTitle: { type: String, default: "Echipa Noastră" },
    teamTitleItalic: { type: String, default: "Medicală." },
    teamDescription: {
      type: String,
      default:
        "O echipă de medici stomatologi experimentați, concentrați pe tratament precis și rezultate de durată.",
    },

    // Before & After section
    baTitle: { type: String, default: "Înainte &" },
    baTitleItalic: { type: String, default: "După." },
    baDescription: {
      type: String,
      default:
        "Fiecare caz reflectă o abordare atent planificată, concentrată pe sănătatea dentară pe termen lung și estetică.",
    },
    baCta: { type: String, default: "Programează o vizită" },

    // Reviews section
    reviewsTitle: { type: String, default: "Recenzii" },
    reviewsTitleItalic: { type: String, default: "Pacienți." },
    reviewsDescription: {
      type: String,
      default:
        "Experiențe ale persoanelor care au finalizat tratamentul cu echipa noastră. Comunicare clară, lucru atent și rezultate care arată natural în viața de zi cu zi.",
    },

    // /services page
    svcKicker: { type: String, default: "Serviciile Noastre" },
    svcHeading: { type: String, default: "Totul pentru" },
    svcHeadingItalic: { type: String, default: "zâmbetul tău." },
    svcDescription: {
      type: String,
      default:
        "De la prevenție la implantologie avansată — o gamă completă de servicii stomatologice cu echipamente moderne.",
    },
    svcStat1Value: { type: String, default: "6+" },
    svcStat1Label: { type: String, default: "Specialități" },
    svcStat2Value: { type: String, default: "5K+" },
    svcStat2Label: { type: String, default: "Pacienți tratați" },
    svcStat3Value: { type: String, default: "10+" },
    svcStat3Label: { type: String, default: "Ani experiență" },
    svcStat4Value: { type: String, default: "100%" },
    svcStat4Label: { type: String, default: "Diagnostic digital" },

    // Contact info
    contactAddress: {
      type: String,
      default: "Str. Grigore Vieru 11,\nȘtefan Vodă, Moldova",
    },
    contactPhone: { type: String, default: "+373 69 100 200" },
    contactEmail: { type: String, default: "ecodentclinic@gmail.com" },
    contactHours: {
      type: String,
      default: "Luni – Vineri: 09:00 – 19:00\nSâmbătă: 09:00 – 14:00",
    },
  },
  { timestamps: true },
);

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
