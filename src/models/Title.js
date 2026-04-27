import mongoose from "mongoose";

const titleSchema = new mongoose.Schema({
  main: { type: String, required: true },
  subtitle: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

const Title = mongoose.model("Title", titleSchema);
export default Title;
