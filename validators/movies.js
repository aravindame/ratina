import Joi from 'joi';

export function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      genresId: Joi.string().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };  
    return Joi.validate(movie, schema);
}