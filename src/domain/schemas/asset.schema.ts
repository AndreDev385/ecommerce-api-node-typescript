import Joi from "joi";

const variarionId = Joi.number();
const productId = Joi.number();
const brandId = Joi.number();
const categoryId = Joi.number();

export const updateAsset = Joi.object({
  variarionId,
  productId,
  brandId,
  categoryId,
});
