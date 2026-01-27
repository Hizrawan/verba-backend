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
      type: "DATETIME",
      allowNull: false,
    },
    updatedAt: {
      type: "DATETIME",
      allowNull: false,
    },
    deletedAt: {
      type: "DATETIME",
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Courses");
}
