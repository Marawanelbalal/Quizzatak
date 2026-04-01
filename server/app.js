import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import gameSessionRoutes from "./routes/gameSessionRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import { createCorsOptions } from "./config/index.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://quizzatak.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
app.use(cors(createCorsOptions()));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/classrooms", classroomRoutes);
app.use("/quizzes", quizRoutes);
app.use("/game-sessions", gameSessionRoutes);
app.use("/submissions", submissionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
