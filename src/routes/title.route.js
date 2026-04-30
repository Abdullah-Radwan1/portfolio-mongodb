import express from "express";
import { getTitle, upsertTitle } from "../controllers/title.controller.js";

const router = express.Router();

router.get("/", getTitle);
router.post("/", upsertTitle);

export default router;
