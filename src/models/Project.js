import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    technologies: [{ type: String }],
    liveUrl: { type: String },
    repoUrl: { type: String },
    imageUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true, // This automatically adds and manages createdAt and updatedAt
  },
);

// Check if the model exists, otherwise create it
const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
