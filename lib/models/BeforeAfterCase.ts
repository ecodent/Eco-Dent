import mongoose, { Schema, models } from "mongoose";

const BeforeAfterSchema = new Schema(
  {
    before: { type: String, required: true },
    after: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.BeforeAfterCase || mongoose.model("BeforeAfterCase", BeforeAfterSchema);
