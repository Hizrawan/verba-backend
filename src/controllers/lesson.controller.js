
import * as lessonService from "../services/lesson.service.js";

export const getLesson = async (req, res, next) => {
  try {
    const lessons = await lessonService.getAllLessons();
    res.json(lessons);
  } catch (err) { next(err); }
};

export const createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) { next(err); }
};
