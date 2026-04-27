import express from "express";
import Intro from "../models/Intro.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const intro = await Intro.findOne({}).lean();
    res.json(intro || {});
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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
});

export default router;
