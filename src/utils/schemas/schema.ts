import Joi from 'joi';

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
  'string.min': 'Invalid email or password',
  'string.email': 'Invalid email or password'
});

export const updateValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5),
  name: Joi.string().required()
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
  'string.min': 'Invalid email or password',
  'string.email': 'Invalid email or password'
});

export const createValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().required(),
  cargo: Joi.string().required()
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
  'string.min': 'Invalid email or password',
  'string.email': 'Invalid email or password'
});

export const createRoleValidation = Joi.object({
  name: Joi.string().required()
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled'
});
