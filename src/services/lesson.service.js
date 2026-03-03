import sequelize from '../config/database.js';
import * as lessonRepo from '../repositories/lesson.repository.js';
import { Lesson } from '../models/lesson.model.js';
import { LessonFlashcard } from '../models/lessonFlashcard.model.js';
import { LessonQuestion } from '../models/lessonQuestion.model.js';
import { LessonQuestionOption } from '../models/lessonQuestionOption.model.js';

const normalizePayload = (payload) => {
  const normalized = { ...payload };
  if (normalized.order !== undefined && normalized.lesson_order === undefined) {
    normalized.lesson_order = normalized.order;
    delete normalized.order;
  }
  return normalized;
};

const persistFlashcards = async (lessonId, flashcards, transaction) => {
  if (!Array.isArray(flashcards)) return;
  await LessonFlashcard.destroy({ where: { lesson_id: lessonId }, transaction });
  if (!flashcards.length) return;
  const rows = flashcards.map((f) => ({
    lesson_id: lessonId,
    card_order: f.card_order,
    front_text: f.front_text,
    back_text: f.back_text,
  }));
  await LessonFlashcard.bulkCreate(rows, { transaction });
};

const persistQuestions = async (lessonId, questions, transaction) => {
  if (!Array.isArray(questions)) return;

  // clean old
  const existing = await LessonQuestion.findAll({
    where: { lesson_id: lessonId },
    attributes: ['id'],
    raw: true,
    transaction,
  });
  const questionIds = existing.map((q) => q.id);
  if (questionIds.length) {
    await LessonQuestionOption.destroy({ where: { question_id: questionIds }, transaction });
  }
  await LessonQuestion.destroy({ where: { lesson_id: lessonId }, transaction });

  if (!questions.length) return;

  for (const q of questions) {
    const createdQ = await LessonQuestion.create(
      {
        lesson_id: lessonId,
        question_order: q.question_order,
        prompt: q.prompt,
        explanation: q.explanation,
      },
      { transaction }
    );

    if (Array.isArray(q.options) && q.options.length) {
      const opts = q.options.map((o) => ({
        question_id: createdQ.id,
        option_order: o.option_order,
        option_text: o.option_text,
        is_correct: !!o.is_correct,
      }));
      await LessonQuestionOption.bulkCreate(opts, { transaction });
    }
  }
};

export const createLesson = async (data) => {
  const normalized = normalizePayload(data);
  const { flashcards, questions, ...lessonData } = normalized;

  const lessonId = await sequelize.transaction(async (transaction) => {
    const lesson = await Lesson.create(lessonData, { transaction });
    await persistFlashcards(lesson.id, flashcards, transaction);
    await persistQuestions(lesson.id, questions, transaction);
    return lesson.id;
  });

  return lessonRepo.getLessonById(lessonId);
};

export const getLessonsByCourse = (courseId) => lessonRepo.getLessonsByCourseId(courseId);
export const getLessonById = (id) => lessonRepo.getLessonById(id);

export const updateLesson = async (id, updates) => {
  const normalized = normalizePayload(updates);
  const { flashcards, questions, ...lessonData } = normalized;

  await sequelize.transaction(async (transaction) => {
    if (Object.keys(lessonData).length) {
      await Lesson.update(lessonData, { where: { id }, transaction });
    }
    if (flashcards !== undefined) {
      await persistFlashcards(id, flashcards, transaction);
    }
    if (questions !== undefined) {
      await persistQuestions(id, questions, transaction);
    }
  });

  return lessonRepo.getLessonById(id);
};

export const deleteLesson = (id) => lessonRepo.deleteLesson(id);
