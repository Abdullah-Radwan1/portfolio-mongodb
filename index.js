import express from "express";
import mongoose from "mongoose";
import titleRoutes from "./src/routes/title.route.js";
import skillRoutes from "./src/routes/skill.route.js";
import projectRoutes from "./src/routes/projects.route.js";
import dotenv from "dotenv";
import introRoutes from "./src/routes/intro.route.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json());
app.use("/api/title", titleRoutes);
app.use("/api/intro", introRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
  console.log("err", err);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
