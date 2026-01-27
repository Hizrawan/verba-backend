export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Rewards", {
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
    xp: {
      type: "INTEGER",
      defaultValue: 0,
    },
    source: {
      type: "VARCHAR(100)", // lesson_complete, bonus, dsb
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
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Rewards");
}
