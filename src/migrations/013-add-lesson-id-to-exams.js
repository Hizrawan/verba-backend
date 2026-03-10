import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn("Exams", "lesson_id", {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Lessons",
      key: "id",
    },
    onDelete: "CASCADE",
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn("Exams", "lesson_id");
}