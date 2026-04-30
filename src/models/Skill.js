import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  level: { type: String },
  iconUrl: { type: String },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

skillSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
