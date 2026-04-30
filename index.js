import express from "express";
import mongoose from "mongoose";
import titleRoutes from "./src/routes/title.route.js";
import skillRoutes from "./src/routes/skill.route.js";
import projectRoutes from "./src/routes/projects.route.js";
import dotenv from "dotenv";
import introRoutes from "./src/routes/intro.route.js";
import experienceRoutes from "./src/routes/experience.route.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
const corsOptions = {
  origin: "http://localhost:4200", // Replace with your actual deployed URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Enable this if you are using cookies or sessions
};
app.use(express.json());
app.use("/title", titleRoutes);
app.use("/intro", introRoutes);
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);
app.use("/experiences", experienceRoutes);
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
