import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Exam } from "./exam.model.js";

export const ExamQuestion = sequelize.define(
  "ExamQuestion",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    exam_id: { type: DataTypes.INTEGER, references: { model: "Exams", key: "id" } },
    type: {
      type: DataTypes.ENUM("multiple_choice", "matching"),
      allowNull: false,
    },
    prompt: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: true }
);

Exam.hasMany(ExamQuestion, { foreignKey: "exam_id" });
ExamQuestion.belongsTo(Exam, { foreignKey: "exam_id" });
