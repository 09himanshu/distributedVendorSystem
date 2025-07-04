import express from 'express';
import axios from 'axios';
import db from './Models/index.js';
import {errorMiddleware} from './middleware/error.middleware.js'
import indexRoutes from './routes/index.routes.js'

const API_URL = 'http://0.0.0.0:5002/api/v1/order/place';

const productIds = ['A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A007', 'A008', 'A009', 'A010', 'B101', 'B102', 'B103', 'B104', 'B105', 'B106', 'B107', 'B108', 'B109', 'B110']

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


setInterval(async () => {
  const product_id = productIds[Math.floor(Math.random() * productIds.length)];
  const quantity = Math.floor(Math.random() * 3) + 1;

  try {
    const { data } = await axios.post(API_URL, { product_id, quantity });
    console.log(`Order placed for ${product_id} x${quantity}`);
  } catch (err) {
    console.error(`Failed:`, err.response?.data?.message || err.message);
  }
}, 3000);

// Start server
app.listen(serverPort, serverHost, () => {
  console.log(`Server is running at http://${serverHost}:${serverPort}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
