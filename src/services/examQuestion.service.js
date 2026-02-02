import * as examQuestionRepo from "../repositories/examQuestion.repository.js";

export const addQuestionsToExam = (examId, questions) =>
  examQuestionRepo.createQuestions(examId, questions);
