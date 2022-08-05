import Joi from "joi";

const name = Joi.string().min(3);
const categoryId = Joi.number();
const brandId = Joi.number();
const description = Joi.string();
const tags = Joi.array().items(Joi.string());

export const createProductSchema = Joi.object({
  name: name.required(),
  description,
  brandId: brandId.required(),
  categoryId: categoryId.required(),
  tags,
});

export const UpdateProductSchema = Joi.object({
  name,
  description,
  brandId,
  categoryId,
  tags,
});
