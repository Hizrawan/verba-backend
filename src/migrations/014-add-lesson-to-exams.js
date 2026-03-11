import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn("Exams", "lesson_id", {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "Lessons", key: "id" },
    onDelete: "SET NULL",
  });

  await queryInterface.addIndex("Exams", ["lesson_id"], {
    name: "idx_exams_lesson_id",
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeIndex("Exams", "idx_exams_lesson_id");
  await queryInterface.removeColumn("Exams", "lesson_id");
}
