import express from 'express'
import {config} from 'dotenv'

config()

import indexRoutes from './routes/index.routes.js'
import {errorMiddleware} from './middleware/error.middleware.js'

const app = express()

const serverPort = Number(process.env.serverPort) || 5001
const serverHost = process.env.serverHost || "0.0.0.0"

app.use(express.json())
app.use((req, res, next) => {
  const start = Date.now();
  
  console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
//   console.log('Headers:', req.headers);
  console.log('Query:', req.query);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[RESPONSE] Status: ${res.statusCode} ${res.statusMessage}`);
    console.log('Response time:', `${duration}ms`);
    // console.log('Response headers:', res.getHeaders());
  });
  
  next();
});

app.use('/api/v1/', indexRoutes)

app.use(errorMiddleware)

// Start server
app.listen(serverPort, serverHost, () => {
  console.log(`Server is running at http://${serverHost}:${serverPort}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
