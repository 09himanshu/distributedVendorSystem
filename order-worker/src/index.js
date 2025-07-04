// import dotenv from 'dotenv';
import db from "./Models/index.models.js";
import { startWorker } from "./queue/consumer.queue.js";

// dotenv.config();

async function DbConnection() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

await DbConnection();

const startSyncLoop = async () => {
  try {
    const init = async () => {
      try {
        await startWorker();
      } catch (err) {
        console.error("Worker startup failed:", err.message);
      }
    };

    await init();

    // Run every 10 seconds
    setInterval(init, 10000);
  } catch (err) {
    console.error("Sync loop crashed:", err);
  }
};

startSyncLoop();
