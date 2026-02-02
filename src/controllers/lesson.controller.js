import * as lessonService from '../services/lesson.service.js';

export const createLesson = async (req, res, next) => {
  try { const lesson = await lessonService.createLesson(req.body); res.status(201).json(lesson); }
  catch (err) { next(err); }
};

export const getLessonsByCourse = async (req, res, next) => {
  try { const lessons = await lessonService.getLessonsByCourse(req.params.courseId); res.json(lessons); }
  catch (err) { next(err); }
};

export const getLessonById = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    res.json(lesson);
  } catch (err) { next(err); }
};

export const updateLesson = async (req, res, next) => {
  try {
    const updated = await lessonService.updateLesson(req.params.id, req.body);
    res.json(updated[1][0]);
  } catch (err) { next(err); }
};

export const deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    res.json({ message: "Lesson deleted" });
  } catch (err) { next(err); }
};
