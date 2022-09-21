import mongoose from 'mongoose';
import express from 'express';
import winston from 'winston';
import config from 'config';
import genres from './routes/genres.js';
import customers from './routes/customers.js';
import movies from './routes/movies.js';
import rentals from './routes/rentals.js';
import users from './routes/users.js';
import auth from './routes/auth.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
let server = null;

(() => {
  initLogger();
  initUncaughtExceptionHandler();
  dbconnection();
  applyMiddlewares();
  startServer();
})();


function initLogger() {
  winston.add(winston.transports.File, { filename: 'retina.log' });
}

function initUncaughtExceptionHandler() {
  process.on('uncaughtException', (ex) => winston.info(ex.message, ex));
  process.on('unhandledRejection', (ex) => winston.info(ex.message, ex));
}

function dbconnection() {
  const url = config.get('db');
  mongoose.connect(url)
    .then(() => winston.info(`Connected to ${url}`))
    .catch(err => winston.info(err.message, err));
}

function applyMiddlewares() {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(errorHandler);
}

function startServer() {
  const port = process.env.PORT || 3000;
  server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
}

export default function getServer() {
  return server;
}