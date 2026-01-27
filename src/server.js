import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/database.js";
import migrator from "./config/migrator.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    const pending = await migrator.pending();

    if (pending.length > 0) {
      console.log(`Running ${pending.length} migrations...`);
      await migrator.up();
      console.log("Migration complete");
    } else {
      console.log("No pending migrations, skip");
    }
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
}

start();
