import mongoose from "mongoose";

const introSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  description: { type: String },
  resumeUrl: { type: String },
  socials: [
    {
      label: String,
      url: String,
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

const Intro = mongoose.model("Intro", introSchema);
export default Intro;
