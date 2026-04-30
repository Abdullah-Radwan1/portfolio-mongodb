import Experience from "../models/experience.model.js";

export const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({})
      .sort({ order: 1, startDate: -1 })
      .lean();
    res.json(experiences);
  } catch (error) {
    next(error);
  }
};

export const getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id).lean();
    if (!experience)
      return res.status(404).json({ error: "Experience not found" });
    res.json(experience);
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!experience)
      return res.status(404).json({ error: "Experience not found" });
    res.json(experience);
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience)
      return res.status(404).json({ error: "Experience not found" });
    res.json({ message: "Experience deleted" });
  } catch (error) {
    next(error);
  }
};
