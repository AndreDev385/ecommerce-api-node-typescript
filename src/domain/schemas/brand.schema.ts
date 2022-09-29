import Joi from 'joi'

const name = Joi.string().min(3);
const description = Joi.string();

export const createBrandSchema = Joi.object({
  name: name.required(),
  description
})

export const validateUpdateBrand = Joi.object({
  name,
  description
})
