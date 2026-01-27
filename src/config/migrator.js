import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "./database.js";

const migrator = new Umzug({
  migrations: {
    glob: "src/migrations/*.js",
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export default migrator;
