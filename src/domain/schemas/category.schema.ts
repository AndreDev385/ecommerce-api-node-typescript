import Joi from "joi";

const id = Joi.number();
const name = Joi.string().min(3);
const description = Joi.string();
const slug = Joi.string();
const tags = Joi.array().items(Joi.string());

export const createCategorySchema = Joi.object({
  name: name.required(),
  slug: slug.required(),
  description,
  tags,
});

export const updateCategorySchema = Joi.object({
  name,
  slug,
  description,
  tags,
});
