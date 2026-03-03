import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.createTable("LessonFlashcards", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    lesson_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "Lessons", key: "id" },
      onDelete: "CASCADE",
    },
    card_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    front_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    back_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await queryInterface.addConstraint("LessonFlashcards", {
    fields: ["lesson_id", "card_order"],
    type: "unique",
    name: "uq_flashcard_order",
  });

  await queryInterface.addIndex("LessonFlashcards", ["lesson_id"], {
    name: "idx_flashcards_lesson_id",
  });

  await queryInterface.createTable("LessonQuestions", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    lesson_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "Lessons", key: "id" },
      onDelete: "CASCADE",
    },
    question_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await queryInterface.addConstraint("LessonQuestions", {
    fields: ["lesson_id", "question_order"],
    type: "unique",
    name: "uq_question_order",
  });

  await queryInterface.addIndex("LessonQuestions", ["lesson_id"], {
    name: "idx_questions_lesson_id",
  });

  await queryInterface.createTable("LessonQuestionOptions", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "LessonQuestions", key: "id" },
      onDelete: "CASCADE",
    },
    option_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await queryInterface.addConstraint("LessonQuestionOptions", {
    fields: ["question_id", "option_order"],
    type: "unique",
    name: "uq_option_order",
  });

  await queryInterface.addIndex("LessonQuestionOptions", ["question_id"], {
    name: "idx_options_question_id",
  });

  await queryInterface.sequelize.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS "uq_one_correct_option_per_question"
    ON "LessonQuestionOptions"("question_id")
    WHERE "is_correct" = TRUE
  `);
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(`
    DROP INDEX IF EXISTS "uq_one_correct_option_per_question"
  `);
  await queryInterface.removeIndex("LessonQuestionOptions", "idx_options_question_id");
  await queryInterface.removeConstraint("LessonQuestionOptions", "uq_option_order");
  await queryInterface.dropTable("LessonQuestionOptions");

  await queryInterface.removeIndex("LessonQuestions", "idx_questions_lesson_id");
  await queryInterface.removeConstraint("LessonQuestions", "uq_question_order");
  await queryInterface.dropTable("LessonQuestions");

  await queryInterface.removeIndex("LessonFlashcards", "idx_flashcards_lesson_id");
  await queryInterface.removeConstraint("LessonFlashcards", "uq_flashcard_order");
  await queryInterface.dropTable("LessonFlashcards");
}
