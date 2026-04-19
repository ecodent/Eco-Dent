import mongoose, { Schema, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imagePosition: { type: String, default: "center 30%" },
    features: [
      {
        title: { type: String, required: true },
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
