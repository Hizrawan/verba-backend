export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Users", {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    firebase_uid: {
      type: "VARCHAR(255)",
      allowNull: false,
      unique: true,
      comment: "UID dari Firebase Auth",
    },
    email: {
      type: "VARCHAR(255)",
      allowNull: false,
      unique: true,
    },
    name: {
      type: "VARCHAR(255)",
      allowNull: true,
    },
    role: {
      type: "VARCHAR(50)",
      allowNull: false,
      defaultValue: "user",
    },
    photo_url: {
      type: "TEXT",
      allowNull: true,
      comment: "URL profile dari Firebase",
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
      allowNull: true,
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Users");
}
