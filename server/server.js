import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import path from 'path';
import cors from 'cors';
import mediaRouter from './routes/routes'; // an imported Express router (defined in `routes.js`) containing specific route handlers.

const app = express(); // Create an instance of an Express application
const PORT = 3000;

//allow cors to allow all origins
app.use(cors());
// initialize middleware for handling JSON and request parsing
app.use(express.json());

// Route to our homepage / index.html
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

// Set up the path and middlewares
/**
 * Mount the mediaRouter middleware at the root ('/') path
 * `app.use()` is a middleware function that applies the `mediaRouter` to all incoming requests.
 * The `/` specifies that `mediaRouter` will handle all routes starting from the root path.
 * `mediaRouter` is an imported Express router (defined in `routes.js`) containing specific route handlers.
 * This setup helps modularize the app by keeping route definitions separate from `server.js`.
 */
app.use('/', mediaRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Global Handler Error
app.use((err, req, res, next) => {
  const defaultObj = {
    message: { err: 'An error occured' },
    status: 500,
    log: 'Unknown error caught',
  };
  const errorObj = Object.assign({}, defaultObj, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Listening port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
