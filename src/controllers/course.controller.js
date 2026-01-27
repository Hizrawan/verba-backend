
import * as courseService from "../services/course.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (err) { next(err); }
};

export const addCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const course = await courseService.createCourse({ title, description });
  res.status(201).json({ success: true, data: course });
});