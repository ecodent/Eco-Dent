import mongoose, { Schema, models } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    name_ru: { type: String, default: "" },
    role_ru: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
