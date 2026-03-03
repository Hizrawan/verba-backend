import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  // 1) add enum-based type column
  await queryInterface.addColumn("Lessons", "type", {
    type: DataTypes.ENUM("material", "flashcard", "multiple_choice"),
    allowNull: false,
    defaultValue: "material",
  });

  // Backfill existing rows: assume material when content exists, otherwise multiple_choice to satisfy the check later.
  await queryInterface.sequelize.query(`
    UPDATE "Lessons"
    SET "type" = CASE
      WHEN "content" IS NULL THEN 'multiple_choice'
      ELSE 'material'
    END
  `);

  // 2) rename order -> lesson_order and enforce not null default
  await queryInterface.renameColumn("Lessons", "order", "lesson_order");
  await queryInterface.changeColumn("Lessons", "lesson_order", {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  });

  // 3) constraints & indexes
  await queryInterface.addConstraint("Lessons", {
    fields: ["course_id", "lesson_order"],
    type: "unique",
    name: "uq_lessons_course_order",
  });

  await queryInterface.addIndex("Lessons", ["course_id"], {
    name: "idx_lessons_course_id",
  });

  await queryInterface.addIndex("Lessons", ["type"], {
    name: "idx_lessons_type",
  });

  // Enforce: material lessons must have content
  await queryInterface.sequelize.query(`
    ALTER TABLE "Lessons"
    ADD CONSTRAINT "ck_material_content"
    CHECK (("type" <> 'material') OR ("content" IS NOT NULL))
  `);
}

export async function down({ context: queryInterface }) {
  // Drop check and indexes/constraints
  await queryInterface.sequelize.query(`
    ALTER TABLE "Lessons"
    DROP CONSTRAINT IF EXISTS "ck_material_content"
  `);

  await queryInterface.removeIndex("Lessons", "idx_lessons_type");
  await queryInterface.removeIndex("Lessons", "idx_lessons_course_id");
  await queryInterface.removeConstraint("Lessons", "uq_lessons_course_order");

  // rename lesson_order back to order
  await queryInterface.renameColumn("Lessons", "lesson_order", "order");

  // remove type column and enum
  await queryInterface.removeColumn("Lessons", "type");
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Lessons_type";');
}
