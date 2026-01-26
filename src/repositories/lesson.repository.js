import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Course from "./course.repository.js";

const Lesson = sequelize.define("Lesson", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

Lesson.belongsTo(Course, { foreignKey: "courseId" });

export default Lesson;
