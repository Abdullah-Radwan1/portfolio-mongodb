import Skill from "../models/Skill.js";

export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({}).sort({ order: 1, name: 1 }).lean();
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

export const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id).lean();
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
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
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    next(error);
  }
};
