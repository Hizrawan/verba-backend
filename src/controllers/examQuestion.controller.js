import * as examQuestionService from "../services/examQuestion.service.js";

export const addQuestions = async (req, res, next) => {
  try {
    const questions = await examQuestionService.addQuestionsToExam(
      req.params.id,
      req.body
    );
    res.status(201).json(questions);
  } catch (err) {
    next(err);
  }
};
