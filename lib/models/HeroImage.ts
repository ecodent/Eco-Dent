import mongoose, { Schema, models } from "mongoose";

const HeroImageSchema = new Schema(
  {
    url: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.HeroImage || mongoose.model("HeroImage", HeroImageSchema);
