import { Progress } from "../models/progress.model.js";
import { Lesson } from "../models/lesson.model.js";
import { WrongAnswer } from "../models/wrongAnswer.model.js";
import { ProgressHistory } from "../models/progressHistory.model.js";

export const createProgress = async (data) => Progress.create(data);
export const getAllProgress = async () => Progress.findAll();
export const getProgressById = async (id) => Progress.findByPk(id);
export const getProgressByUser = async (userId) =>
  Progress.findAll({ where: { user_id: userId } });
export const getProgressByLesson = async (lessonId) =>
  Progress.findAll({ where: { lesson_id: lessonId } });
export const updateProgress = async (id, updates) =>
  Progress.update(updates, { where: { id }, returning: true });
export const deleteProgress = async (id) => Progress.destroy({ where: { id } });

export const getLessonStatus = async (userId, lessonId) =>
  Progress.findOne({ where: { user_id: userId, lesson_id: lessonId } });

export const upsertProgressForUser = async (userId, lessonId, payload) => {
  const [progress, created] = await Progress.findOrCreate({
    where: { user_id: userId, lesson_id: lessonId },
    defaults: { user_id: userId, lesson_id: lessonId, ...payload },
  });

  if (!created) {
    await progress.update(payload);
  }

  return progress;
};

export const getCourseProgressSummary = async (userId, courseId) => {
  const totalLessons = await Lesson.count({ where: { course_id: courseId } });

  const completedLessons = await Progress.count({
    where: { user_id: userId, completed: true },
    include: [
      {
        model: Lesson,
        required: true,
        attributes: [],
        where: { course_id: courseId },
      },
    ],
  });

  const totalWrongAnswers = await WrongAnswer.count({
    where: { user_id: userId, course_id: courseId },
  });

  return { totalLessons, completedLessons, totalWrongAnswers };
};

export const createHistoryEntries = async (entries) =>
  ProgressHistory.bulkCreate(entries, { returning: true });

export const getHistoryByUser = async (userId) =>
  ProgressHistory.findAll({
    where: { user_id: userId },
    order: [["completed_at", "DESC"]],
  });

export const bulkInsertWrongAnswers = async (entries) =>
  WrongAnswer.bulkCreate(entries, { returning: true });

export const countWrongAnswersByLesson = async (userId, lessonId) =>
  WrongAnswer.count({ where: { user_id: userId, lesson_id: lessonId } });
