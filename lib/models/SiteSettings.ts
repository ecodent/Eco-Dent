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
