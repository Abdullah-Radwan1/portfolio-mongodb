import express from "express";
import { getIntro, upsertIntro } from "../controllers/intro.controller.js";

const router = express.Router();

router.get("/", getIntro);
router.post("/", upsertIntro);

export default router;
