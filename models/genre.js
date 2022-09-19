import Joi from 'joi';
import mongoose from 'mongoose';

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

export const Genre = mongoose.model('Genre', genreSchema);

export default function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}
