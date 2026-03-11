import { DataTypes } from "sequelize";

const TABLE = "Exams";
const COL = "lesson_id";
const IDX = "idx_exams_lesson_id";

export async function up({ context: queryInterface }) {
  const table = await queryInterface.describeTable(TABLE);

  if (!table[COL]) {
    await queryInterface.addColumn(TABLE, COL, {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Lessons", key: "id" },
      onDelete: "SET NULL",
    });
  }

  await queryInterface.sequelize.query(`
    CREATE INDEX IF NOT EXISTS "${IDX}" ON "${TABLE}"("${COL}");
  `);
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(`
    DROP INDEX IF EXISTS "${IDX}";
  `);
  const table = await queryInterface.describeTable(TABLE);
  if (table[COL]) {
    await queryInterface.removeColumn(TABLE, COL);
  }
}
