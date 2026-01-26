import express from "express";
import { getCourses, createCourse } from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCourses);          // public
router.post("/", authenticate, createCourse); // protected

export default router;
