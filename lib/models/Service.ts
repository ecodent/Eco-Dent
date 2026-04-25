import mongoose, { Schema, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, default: "", unique: true },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    imagePosition: { type: String, default: "center 30%" },
    features: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    benefits: [{ type: String }],
    cardColor: { type: String, default: "#ECEEF1" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Service || mongoose.model("Service", ServiceSchema);
