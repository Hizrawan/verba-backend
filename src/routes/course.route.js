import express from "express";
import { getAllCourses, createCourse, getCourseById, updateCourse, deleteCourse } from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
          
router.post("/", authenticate, createCourse);
router.put("/:id", authenticate, updateCourse);
router.delete("/:id", authenticate, deleteCourse);

export default router;
