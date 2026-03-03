import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn("Progress", "score", {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  });

  await queryInterface.addColumn("Progress", "wrong_count", {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn("Progress", "wrong_count");
  await queryInterface.removeColumn("Progress", "score");
}
