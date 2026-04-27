import express from "express";
import Title from "../models/Title.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const title = await Title.findOne({});
    console.log(title);
    res.json(title || {});
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title } = req.body;
  console.log(title);
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
});

export default router;
