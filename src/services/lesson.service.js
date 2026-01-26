
import Lesson from "../repositories/lesson.repository.js";

export const getAllLessons = async () => {
  return await Lesson.findAll();
};

export const createLesson = async (data) => {
  return await Lesson.create(data);
};
