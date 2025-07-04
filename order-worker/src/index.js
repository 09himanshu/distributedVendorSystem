// import dotenv from 'dotenv';
import db from './Models/index.models.js';
import { startWorker } from './queue/consumer.js';

// dotenv.config();

async function DbConnection() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({alter: true});
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

await DbConnection()

const init = async () => {
  try {
    await startWorker();
  } catch (err) {
    console.error('Worker startup failed:', err.message);
  }
};

init();
