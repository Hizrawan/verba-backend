import express from "express";
import { getAllCourses, createCourse } from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", createCourse);          
//router.post("/", authenticate, createCourse); 
router.post("/", getAllCourses); 

export default router;
