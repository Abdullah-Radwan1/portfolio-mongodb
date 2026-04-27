import express from "express";
import Skill from "../models/Skill.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const skills = await Skill.find({}).sort({ order: 1, name: 1 }).lean();
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id).lean();
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
