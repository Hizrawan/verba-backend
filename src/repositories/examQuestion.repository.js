import sequelize from "../config/database.js";
import { ExamQuestion } from "../models/examQuestion.model.js";
import { ExamQuestionOption } from "../models/examOption.model.js";
import { ExamQuestionPair } from "../models/examPair.model.js";

export const createQuestions = async (examId, questions = []) => {
  const t = await sequelize.transaction();
  try {
    const created = [];

    for (const q of questions) {
      const question = await ExamQuestion.create(
        {
          exam_id: examId,
          type: q.type,
          prompt: q.prompt,
        },
        { transaction: t }
      );

      if (q.type === "multiple_choice" && Array.isArray(q.options)) {
        const options = await ExamQuestionOption.bulkCreate(
          q.options.map((opt) => ({
            question_id: question.id,
            text: opt.text,
            is_correct: !!opt.is_correct,
          })),
          { transaction: t, returning: true }
        );
        question.setDataValue("options", options);
      }

      if (q.type === "matching" && Array.isArray(q.pairs)) {
        const pairs = await ExamQuestionPair.bulkCreate(
          q.pairs.map((pair) => ({
            question_id: question.id,
            left_text: pair.left_text,
            right_text: pair.right_text,
          })),
          { transaction: t, returning: true }
        );
        question.setDataValue("pairs", pairs);
      }

      created.push(question);
    }

    await t.commit();
    return created;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};
