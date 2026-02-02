import express from "express";
import {
  createLesson,
  deleteLesson,
  getLessonById,
  getLessonsByCourse,
  updateLesson,
} from "../controllers/lesson.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/course/:courseId", getLessonsByCourse);
router.get("/:id", getLessonById);
router.post("/", authenticate, createLesson);
router.put("/:id", authenticate, updateLesson);
router.delete("/:id", authenticate, deleteLesson);

export default router;
