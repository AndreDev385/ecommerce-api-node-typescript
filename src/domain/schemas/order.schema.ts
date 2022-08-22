import Joi from "joi";

const variations = Joi.array().items(
  Joi.object({
    id: Joi.number().required(),
    quantity: Joi.number().required(),
  })
);
const status = Joi.string()
  .pattern(/"waiting"/)
  .pattern(/"canceled"/)
  .pattern(/"completed"/);
const userId = Joi.number();

export const createOrderSchema = Joi.object({
  variations: variations.required(),
  userId: userId.required(),
});

export const updateOrderSchema = Joi.object({
  userId,
  variations,
  status,
});

export const updateOrderStatusSchema = status;
