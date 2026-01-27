import express from "express";
import { getCourses, addCourse } from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCourses);          
//router.post("/", authenticate, createCourse); 
router.post("/", addCourse); 

export default router;
