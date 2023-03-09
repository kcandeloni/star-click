import Joi from "joi";
import { Avatar } from "@prisma/client";

export const newUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  avatar: Joi.string().required().valid(...Object.values(Avatar)),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

export const updateUserSchema = Joi.object({
  id: Joi.number().integer().required(),
  avatar: Joi.string().required().valid(...Object.values(Avatar)),
});