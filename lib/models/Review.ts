import mongoose, { Schema, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    grade: { type: Number, default: 5, min: 0, max: 5 },
    text: { type: String, default: "" },
    name_ru: { type: String, default: "" },
    text_ru: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Review || mongoose.model("Review", ReviewSchema);
