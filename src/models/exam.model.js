import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Course } from "../models/course.model.js";
import { Lesson } from "./lesson.model.js";

export const Exam = sequelize.define(
  "Exam",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    course_id: { type: DataTypes.INTEGER, references: { model: "Courses", key: "id" } },
    lesson_id: { type: DataTypes.INTEGER, references: { model: "Lessons", key: "id" } },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    total_questions: { type: DataTypes.INTEGER, defaultValue: 0 },
    passing_score: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { timestamps: true, paranoid: true }
);

Course.hasMany(Exam, { foreignKey: "course_id" });
Exam.belongsTo(Course, { foreignKey: "course_id" });

Lesson.hasMany(Exam, { foreignKey: "lesson_id" });
Exam.belongsTo(Lesson, { foreignKey: "lesson_id" });
