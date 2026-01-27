export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Progress", {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: "INTEGER",
      allowNull: false,
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
    },
    lesson_id: {
      type: "INTEGER",
      allowNull: false,
      references: {
        table: "Lessons",
        field: "id",
      },
      onDelete: "CASCADE",
    },
    completed: {
      type: "BOOLEAN",
      defaultValue: false,
    },
    createdAt: {
      type: "DATETIME",
      allowNull: false,
    },
    updatedAt: {
      type: "DATETIME",
      allowNull: false,
    },
  });

  // prevent duplicate progress
  await queryInterface.addConstraint("Progress", {
    fields: ["user_id", "lesson_id"],
    type: "unique",
    name: "unique_user_lesson_progress",
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Progress");
}
