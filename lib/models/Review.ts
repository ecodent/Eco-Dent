import mongoose, { Schema, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    grade: { type: Number, required: true, min: 0, max: 5 },
    text: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Review || mongoose.model("Review", ReviewSchema);
