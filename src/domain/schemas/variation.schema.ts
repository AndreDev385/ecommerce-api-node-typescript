import Joi from 'joi'

const name = Joi.string().min(3);
const stock = Joi.number();
const normalPrice = Joi.number();
const offerPrice = Joi.number();
const productId = Joi.number();
const images = Joi.array().items(Joi.number());
const attributes = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required()
  })
);

export const createVariationSchema = Joi.object({
  productId: productId.required(),
  stock,
  normalPrice,
  offerPrice,
  images,
  attributes
})

export const updateVariationSchema = Joi.object({
  productId,
  stock,
  normalPrice,
  offerPrice,
  images,
  attributes
})
