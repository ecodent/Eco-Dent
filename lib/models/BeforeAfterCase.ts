import mongoose, { Schema, models } from "mongoose";

const BeforeAfterSchema = new Schema(
  {
    before: { type: String, default: "" },
    after: { type: String, default: "" },
    label: { type: String, default: "" },
    label_ru: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.BeforeAfterCase || mongoose.model("BeforeAfterCase", BeforeAfterSchema);
