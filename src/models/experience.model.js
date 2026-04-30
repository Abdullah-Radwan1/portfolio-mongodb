import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    responsibilities: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
export default Experience;
