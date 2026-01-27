export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Courses", {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    description: {
      type: "TEXT",
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
  await queryInterface.dropTable("Courses");
}
