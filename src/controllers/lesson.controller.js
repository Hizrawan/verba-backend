import * as lessonService from '../services/lesson.service.js';

export const createLesson = async (req, res, next) => {
  try { const lesson = await lessonService.createLesson(req.body); res.status(201).json(lesson); }
  catch (err) { next(err); }
};

export const getLessonsByCourse = async (req, res, next) => {
  try { const lessons = await lessonService.getLessonsByCourse(req.params.courseId); res.json(lessons); }
  catch (err) { next(err); }
};
