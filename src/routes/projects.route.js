import express from "express";
import Project from "../models/Project.js";
const router = express.Router();
import upload from "../../middleware/upload.js";
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json(projects);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      imageUrl: req.file?.path, // 🔥 this is Cloudinary URL
    };

    const project = await Project.create(projectData);

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
