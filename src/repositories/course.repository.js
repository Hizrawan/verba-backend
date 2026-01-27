
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Course = sequelize.define("Course", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

export async function insertCourse({ title, description }) {
  const [result] = await sequelize.query(
    `INSERT INTO "Courses" ("title", "description", "createdAt", "updatedAt") 
     VALUES ($1, $2, NOW(), NOW()) 
     RETURNING *`,
    { bind: [title, description] }
  );
  return result[0];
}

export default Course;
