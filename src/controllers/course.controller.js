import * as courseService from '../services/course.service.js';

export const createCourse = async (req, res, next) => {
  try { const course = await courseService.createCourse(req.body); res.status(201).json(course); }
  catch (err) { next(err); }
};
export const getAllCourses = async (req, res, next) => {
  try { const courses = await courseService.getAllCourses(); res.json(courses); }
  catch (err) { next(err); }
};
export const getCourseById = async (req, res, next) => {
  try { const course = await courseService.getCourseById(req.params.id); res.json(course); }
  catch (err) { next(err); }
};
export const updateCourse = async (req, res, next) => {
  try { const course = await courseService.updateCourse(req.params.id, req.body); res.json(course); }
  catch (err) { next(err); }
};
export const deleteCourse = async (req, res, next) => {
  try { await courseService.deleteCourse(req.params.id); res.status(204).end(); }
  catch (err) { next(err); }
};
