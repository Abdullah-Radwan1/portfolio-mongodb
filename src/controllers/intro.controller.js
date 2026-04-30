import Intro from "../models/Intro.js";

export const getIntro = async (req, res, next) => {
  try {
    const intro = await Intro.findOne({}).lean();
    res.json(intro || {});
  } catch (error) {
    next(error);
  }
};

export const upsertIntro = async (req, res, next) => {
  try {
    const intro = await Intro.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.json(intro);
  } catch (error) {
    next(error);
  }
};
