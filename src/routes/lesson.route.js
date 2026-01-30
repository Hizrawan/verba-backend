import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getLessonsByCourse, getLessonById, createLesson, updateLesson, deleteLesson} from "../controllers/lesson.controller.js";

const router = express.Router();

router.get("/", authenticate, getLessonsByCourse);
router.get("/:id", authenticate, getLessonById);
router.post("/", authenticate, createLesson);
router.put("/:id", authenticate, updateLesson);
router.delete("/:id", authenticate, deleteLesson);

export default router;
