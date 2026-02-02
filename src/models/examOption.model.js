import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { ExamQuestion } from "./examQuestion.model.js";

export const ExamQuestionOption = sequelize.define(
  "ExamQuestionOption",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    question_id: {
      type: DataTypes.INTEGER,
      references: { model: "ExamQuestions", key: "id" },
    },
    text: { type: DataTypes.STRING(500), allowNull: false },
    is_correct: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true }
);

ExamQuestion.hasMany(ExamQuestionOption, { foreignKey: "question_id" });
ExamQuestionOption.belongsTo(ExamQuestion, { foreignKey: "question_id" });
