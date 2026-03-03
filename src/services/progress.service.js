import * as progressRepo from "../repositories/progress.repository.js";
import { Lesson } from "../models/lesson.model.js";

export const createProgress = (data) => progressRepo.createProgress(data);
export const getAllProgress = () => progressRepo.getAllProgress();
export const getProgressById = (id) => progressRepo.getProgressById(id);
export const getProgressByUser = (userId) => progressRepo.getProgressByUser(userId);
export const getProgressByLesson = (lessonId) => progressRepo.getProgressByLesson(lessonId);
export const updateProgress = (id, updates) => progressRepo.updateProgress(id, updates);
export const deleteProgress = (id) => progressRepo.deleteProgress(id);

export const getLessonStatus = async (userId, lessonId) => {
  const [progress, wrongAnswersCount] = await Promise.all([
    progressRepo.getLessonStatus(userId, lessonId),
    progressRepo.countWrongAnswersByLesson(userId, lessonId),
  ]);

  if (!progress) {
    return {
      user_id: userId,
      lesson_id: Number(lessonId),
      completed: false,
      score: 0,
      wrong_count: wrongAnswersCount,
    };
  }

  return {
    user_id: progress.user_id,
    lesson_id: progress.lesson_id,
    completed: progress.completed,
    score: progress.score ?? 0,
    wrong_count: progress.wrong_count ?? wrongAnswersCount,
    updated_at: progress.updatedAt,
  };
};

export const getCourseSummary = async (userId, courseId) => {
  const { totalLessons, completedLessons, totalWrongAnswers } =
    await progressRepo.getCourseProgressSummary(userId, courseId);

  const progressPercent =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return {
    course_id: Number(courseId),
    total_lessons: totalLessons,
    completed_lessons: completedLessons,
    progress_percent: progressPercent,
    total_wrong_answers: totalWrongAnswers,
  };
};

export const getProgressHistory = (userId) =>
  progressRepo.getHistoryByUser(userId);

const resolveCourseId = async (lessonId, providedCourseId) => {
  if (providedCourseId) return providedCourseId;
  const lesson = await Lesson.findByPk(lessonId, { attributes: ["course_id"] });
  return lesson?.course_id ?? null;
};

export const syncProgress = async (userId, payload) => {
  const { lesson_id, course_id, completed = false } = payload;

  if (!lesson_id) throw new Error("lesson_id is required");

  const courseId = await resolveCourseId(lesson_id, course_id);
  const wrongCount =
    Number.isInteger(payload.wrong_count) && payload.wrong_count >= 0
      ? payload.wrong_count
      : Array.isArray(payload.wrong_answers)
      ? payload.wrong_answers.length
      : 0;

  const progress = await progressRepo.upsertProgressForUser(userId, lesson_id, {
    completed,
    score: payload.score ?? 0,
    wrong_count: wrongCount,
  });

  if (completed) {
    await progressRepo.createHistoryEntries([
      {
        user_id: userId,
        lesson_id,
        course_id: courseId,
        score: payload.score ?? 0,
        wrong_count: wrongCount,
        xp_gained: payload.xp_gained ?? 0,
        completed_at: payload.completed_at ?? new Date(),
      },
    ]);
  }

  if (Array.isArray(payload.wrong_answers) && payload.wrong_answers.length) {
    const mapped = await Promise.all(
      payload.wrong_answers.map(async (item) => {
        const resolvedCourseId = await resolveCourseId(
          item.lesson_id ?? lesson_id,
          item.course_id ?? courseId
        );

        return {
          user_id: userId,
          lesson_id: item.lesson_id ?? lesson_id,
          course_id: resolvedCourseId,
          lesson_title: item.lesson_title,
          prompt: item.prompt,
          user_answer: item.user_answer,
          correct_answer: item.correct_answer,
          recorded_at: item.recorded_at ?? new Date(),
        };
      })
    );

    await progressRepo.bulkInsertWrongAnswers(mapped);
  }

  return progress;
};

export const recordWrongAnswersBulk = async (userId, entries) => {
  if (!Array.isArray(entries) || entries.length === 0) return [];

  const prepared = await Promise.all(
    entries.map(async (item) => {
      const courseId = await resolveCourseId(item.lesson_id, item.course_id);
      return {
        user_id: userId,
        lesson_id: item.lesson_id,
        course_id: courseId,
        lesson_title: item.lesson_title,
        prompt: item.prompt,
        user_answer: item.user_answer,
        correct_answer: item.correct_answer,
        recorded_at: item.recorded_at ?? new Date(),
      };
    })
  );

  const created = await progressRepo.bulkInsertWrongAnswers(prepared);

  // Update wrong_count snapshot on progress per lesson
  const lessons = [...new Set(prepared.map((p) => p.lesson_id))];
  for (const lessonId of lessons) {
    const count = await progressRepo.countWrongAnswersByLesson(userId, lessonId);
    await progressRepo.upsertProgressForUser(userId, lessonId, {
      wrong_count: count,
    });
  }

  return created;
};
