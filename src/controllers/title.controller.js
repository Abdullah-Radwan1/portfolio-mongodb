import Title from "../models/Title.js";

export const getTitle = async (req, res, next) => {
  try {
    const title = await Title.findOne({});
    res.json(title || {});
  } catch (error) {
    next(error);
  }
};

export const upsertTitle = async (req, res, next) => {
  try {
    const title = await Title.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.status(201).json(title);
  } catch (error) {
    next(error);
  }
};
