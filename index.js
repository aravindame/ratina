import mongoose from 'mongoose';
import express from 'express';
import winston from 'winston';
import genres from './routes/genres.js';
import customers from './routes/customers.js';
import movies from './routes/movies.js';
import rentals from './routes/rentals.js';
import users from './routes/users.js';
import auth from './routes/auth.js';
import { errorHandler } from './middleware/error-handler.js';

winston.add(winston.transports.File, {filename: 'retina.log'});
process.on('uncaughtException', (ex)=> winston.log(ex.message, ex));
process.on('unhandledRejection', (ex)=> winston.log(ex.message, ex))

const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(errorHandler);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));