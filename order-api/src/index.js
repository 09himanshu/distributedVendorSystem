import express from 'express';
// import dotenv from 'dotenv';
import db from './Models/index.js';
import {errorMiddleware} from './middleware/error.middleware.js'
import indexRoutes from './routes/index.routes.js'
// dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1', indexRoutes);

const serverPort = Number(process.env.serverPort) || 5002
const serverHost = process.env.serverHost || "0.0.0.0"

app.use(errorMiddleware)

async function DbConnection() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({alert: true});
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

await DbConnection()

// Start server
app.listen(serverPort, serverHost, () => {
  console.log(`Server is running at http://${serverHost}:${serverPort}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
