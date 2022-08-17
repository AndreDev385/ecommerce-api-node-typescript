import Joi from "joi";

const variationIds = Joi.array().items(Joi.number());
const status = Joi.string()
  .pattern(/"waiting"/)
  .pattern(/"canceled"/)
  .pattern(/"completed"/);
const userId = Joi.number();

export const createOrderSchema = Joi.object({
  variationIds: variationIds.required(),
  userId: userId.required(),
});

export const updateOrderSchema = Joi.object({
  userId,
  variationIds,
  status,
});

export const updateOrderStatusSchema = status;
