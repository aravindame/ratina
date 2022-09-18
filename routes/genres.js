import express from 'express';
import { validateGenre } from '../validators/genres.js';
import Genres from '../models/genres.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await Genres.find();
  res.send(result);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = { name: req.body.name };
  const document = new Genres(genre);
  try {
    await document.save(document);
  } catch (error) {
    console.log(error.message)
  }
  res.send(document);
});

router.put('/:id', async (req, res) => {
  
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genres.findByIdAndUpdate(req.params.id, 
    { name : req.body.name }, { new: true});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

export default router;