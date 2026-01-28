import * as courseService from '../services/course.service.js';

export const createCourse = async (req, res, next) => {
  try { const course = await courseService.createCourse(req.body); res.status(201).json(course); }
  catch (err) { next(err); }
};
export const getAllCourses = async (req, res, next) => {
  try { const courses = await courseService.getAllCourses(); res.json(courses); }
  catch (err) { next(err); }
};
