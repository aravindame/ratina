import validate, { Rental } from '../models/rental.js';
import { Movie } from '../models/movie.js';
import { Customer } from '../models/customer.js';
import { Router } from 'express';
import Fawn from 'fawn';
import { asyncSafeExecutionHandler } from '../middleware/async-safe-execution-handler.js';

const router = Router();

router.get('/', asyncSafeExecutionHandler(async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
}));

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try {
    new Fawn.Task().save('rentals', rental)
      .update('movies',
        { _id: movie.id },
        { $inc: { numberInStock: -1 } })
      .run();
  } catch (error) {
    res.status(500).send(error.message);
  }
  res.send(rental);
});

router.get('/:id', asyncSafeExecutionHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
}));

export default router; 