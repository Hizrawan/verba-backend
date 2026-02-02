import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.createTable("ExamQuestions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Exams", key: "id" },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM("multiple_choice", "matching"),
      allowNull: false,
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  await queryInterface.createTable("ExamQuestionOptions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "ExamQuestions", key: "id" },
      onDelete: "CASCADE",
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Only used for multiple_choice questions",
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

  await queryInterface.createTable("ExamQuestionPairs", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "ExamQuestions", key: "id" },
      onDelete: "CASCADE",
    },
    left_text: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    right_text: {
      type: DataTypes.STRING(255),
      allowNull: false,
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

  await queryInterface.addIndex("ExamQuestions", ["exam_id"]);
  await queryInterface.addIndex("ExamQuestionOptions", ["question_id"]);
  await queryInterface.addIndex("ExamQuestionPairs", ["question_id"]);
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeIndex("ExamQuestionPairs", ["question_id"]);
  await queryInterface.removeIndex("ExamQuestionOptions", ["question_id"]);
  await queryInterface.removeIndex("ExamQuestions", ["exam_id"]);

  await queryInterface.dropTable("ExamQuestionPairs");
  await queryInterface.dropTable("ExamQuestionOptions");
  await queryInterface.dropTable("ExamQuestions");
}
