export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Lessons", {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    course_id: {
      type: "INTEGER",
      allowNull: false,
      references: {
        table: "Courses",
        field: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    content: {
      type: "TEXT",
    },
    order: {
      type: "INTEGER",
      defaultValue: 0,
    },
    createdAt: {
      type: "DATE",
      allowNull: false,
    },
    updatedAt: {
      type: "DATE",
      allowNull: false,
    },
    deletedAt: {
      type: "DATE",
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Lessons");
}
