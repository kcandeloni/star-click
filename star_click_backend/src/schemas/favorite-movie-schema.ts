import Joi from "joi";

export const imdbIDMovieSchema = Joi.object({
  imdbID: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
});

export const favoriteMovieIdSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});
