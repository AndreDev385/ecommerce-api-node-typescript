import {
  createOrderSchema,
  updateOrderSchema,
  updateOrderStatusSchema,
} from "../schemas/order.schema";
import { Variation } from "./variation";

export type Status = "completed" | "waiting" | "canceled";

export class Order {
  id: number;
  userId: number;
  variationIds: number[];
  totalPrice: number;
  status: Status;

  static validateCreateOrder(data: CreateOrder) {
    const { error } = createOrderSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }

  static validateChangeOrderStatus(status: Status) {
    const { error } = updateOrderStatusSchema.validate(status, {
      abortEarly: false,
    });
    if (error) throw error;
  }

  static validateUpdateOrder(data: UpdateOrder) {
    const { error } = updateOrderSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }
}

export interface CreateOrder {
  userId: number;
  variationIds: number[];
}

export interface UpdateOrder {
  userId?: number;
  variationIds?: number[];
  totalPrice?: number;
}
