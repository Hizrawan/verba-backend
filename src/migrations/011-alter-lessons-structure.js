import { DataTypes } from "sequelize";

const ENUM_NAME = "enum_Lessons_type";
const TABLE = "Lessons";

async function ensureEnum(queryInterface) {
  await queryInterface.sequelize.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${ENUM_NAME}') THEN
        CREATE TYPE "${ENUM_NAME}" AS ENUM ('material', 'flashcard', 'multiple_choice');
      END IF;
    END$$;
  `);
}

export async function up({ context: queryInterface }) {
  const table = await queryInterface.describeTable(TABLE);

  await ensureEnum(queryInterface);

  if (!table.type) {
    await queryInterface.addColumn(TABLE, "type", {
      type: DataTypes.ENUM("material", "flashcard", "multiple_choice"),
      allowNull: false,
      defaultValue: "material",
    });
  } else {
    // Align existing column to the enum type and default/not null
    await queryInterface.sequelize.query(`
      ALTER TABLE "${TABLE}"
      ALTER COLUMN "type" TYPE "${ENUM_NAME}" USING "type"::text::"${ENUM_NAME}",
      ALTER COLUMN "type" SET DEFAULT 'material',
      ALTER COLUMN "type" SET NOT NULL
    `);
  }

  // Backfill nulls to avoid check failures
  await queryInterface.sequelize.query(`
    UPDATE "${TABLE}"
    SET "type" = CASE
      WHEN "type" IS NULL AND "content" IS NULL THEN 'multiple_choice'
      WHEN "type" IS NULL THEN 'material'
      ELSE "type"
    END
  `);

  // Rename order -> lesson_order if needed
  if (!table.lesson_order && table.order) {
    await queryInterface.renameColumn(TABLE, "order", "lesson_order");
  }

  // Ensure lesson_order exists with not null + default
  const updatedTable = await queryInterface.describeTable(TABLE);
  if (updatedTable.lesson_order) {
    await queryInterface.changeColumn(TABLE, "lesson_order", {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  }

  // Unique constraint course_id + lesson_order
  await queryInterface.sequelize.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'uq_lessons_course_order'
      ) THEN
        ALTER TABLE "${TABLE}"
        ADD CONSTRAINT "uq_lessons_course_order" UNIQUE ("course_id", "lesson_order");
      END IF;
    END$$;
  `);

  // Indexes
  await queryInterface.sequelize.query(`
    CREATE INDEX IF NOT EXISTS "idx_lessons_course_id" ON "${TABLE}"("course_id");
  `);

  await queryInterface.sequelize.query(`
    CREATE INDEX IF NOT EXISTS "idx_lessons_type" ON "${TABLE}"("type");
  `);

  // Check constraint for material content
  await queryInterface.sequelize.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'ck_material_content'
      ) THEN
        ALTER TABLE "${TABLE}"
        ADD CONSTRAINT "ck_material_content"
        CHECK (("type" <> 'material') OR ("content" IS NOT NULL));
      END IF;
    END$$;
  `);
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(`
    ALTER TABLE "${TABLE}"
    DROP CONSTRAINT IF EXISTS "ck_material_content"
  `);

  await queryInterface.sequelize.query(`
    DROP INDEX IF EXISTS "idx_lessons_type";
  `);

  await queryInterface.sequelize.query(`
    DROP INDEX IF EXISTS "idx_lessons_course_id";
  `);

  await queryInterface.removeConstraint(TABLE, "uq_lessons_course_order").catch(() => {});

  const table = await queryInterface.describeTable(TABLE);
  if (table.lesson_order) {
    await queryInterface.renameColumn(TABLE, "lesson_order", "order").catch(() => {});
  }

  if (table.type) {
    await queryInterface.removeColumn(TABLE, "type").catch(() => {});
  }

  await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "${ENUM_NAME}";`);
}
