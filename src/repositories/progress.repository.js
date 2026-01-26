import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.repository.js";
import Lesson from "./lesson.repository.js";

const Progress = sequelize.define("Progress", {
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  score: { type: DataTypes.FLOAT, defaultValue: 0 },
});

Progress.belongsTo(User, { foreignKey: "userId" });
Progress.belongsTo(Lesson, { foreignKey: "lessonId" });

export default Progress;
