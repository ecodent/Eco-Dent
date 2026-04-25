import mongoose, { Schema, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, default: "", unique: true },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    title_ru: { type: String, default: "" },
    subtitle_ru: { type: String, default: "" },
    description_ru: { type: String, default: "" },
    image: { type: String, default: "" },
    imagePosition: { type: String, default: "center 30%" },
    features: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        title_ru: { type: String, default: "" },
        description_ru: { type: String, default: "" },
      },
    ],
    benefits: [{ type: String }],
    benefits_ru: [{ type: String }],
    cardColor: { type: String, default: "#ECEEF1" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Service || mongoose.model("Service", ServiceSchema);
