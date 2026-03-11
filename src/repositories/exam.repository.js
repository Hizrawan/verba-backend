import { Exam } from "../models/exam.model.js";
import { ExamQuestion } from "../models/examQuestion.model.js";
import { ExamQuestionOption } from "../models/examOption.model.js";
import { ExamQuestionPair } from "../models/examPair.model.js";

const includeExam = [
  {
    model: ExamQuestion,
    as: "ExamQuestions",
    required: false,
    include: [
      {
        model: ExamQuestionOption,
        as: "ExamQuestionOptions",
        required: false,
      },
      {
        model: ExamQuestionPair,
        as: "ExamQuestionPairs",
        required: false,
      },
    ],
  },
];

export const createExam = async (data) => Exam.create(data);

export const getAllExams = async () =>
  Exam.findAll({
    include: includeExam,
  });

export const getExamById = async (id) =>
  Exam.findByPk(id, {
    include: includeExam,
  });

export const getExamsByLesson = async (lessonId) =>
  Exam.findAll({
    where: { lesson_id: lessonId },
    include: includeExam,
  });

export const updateExam = async (id, updates) =>
  Exam.update(updates, { where: { id }, returning: true });

export const deleteExam = async (id) => Exam.destroy({ where: { id } });
