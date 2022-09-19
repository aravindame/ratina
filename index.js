import mongoose from 'mongoose';
import genres from './routes/genres.js';
import customers from './routes/customers.js';
import movies from './routes/movies.js';
import rentals from './routes/rentals.js';
import express from 'express';
const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));