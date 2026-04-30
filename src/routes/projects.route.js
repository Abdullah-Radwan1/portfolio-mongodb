import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { uploadImage } from "../../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", uploadImage, createProject);
router.put("/:id", uploadImage, updateProject);
router.delete("/:id", deleteProject);

export default router;
