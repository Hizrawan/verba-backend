import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.createTable("WrongAnswers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Courses", key: "id" },
      onDelete: "SET NULL",
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Lessons", key: "id" },
      onDelete: "CASCADE",
    },
    lesson_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    correct_answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  await queryInterface.addIndex("WrongAnswers", ["user_id", "lesson_id"]);
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("WrongAnswers");
}
