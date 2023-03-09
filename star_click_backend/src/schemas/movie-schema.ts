import Joi from "joi";

export const searchFieldSchema = Joi.object({
  search: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
});
