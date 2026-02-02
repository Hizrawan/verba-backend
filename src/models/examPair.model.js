import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { ExamQuestion } from "./examQuestion.model.js";

export const ExamQuestionPair = sequelize.define(
  "ExamQuestionPair",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    question_id: {
      type: DataTypes.INTEGER,
      references: { model: "ExamQuestions", key: "id" },
    },
    left_text: { type: DataTypes.STRING(255), allowNull: false },
    right_text: { type: DataTypes.STRING(255), allowNull: false },
  },
  { timestamps: true }
);

ExamQuestion.hasMany(ExamQuestionPair, { foreignKey: "question_id" });
ExamQuestionPair.belongsTo(ExamQuestion, { foreignKey: "question_id" });
