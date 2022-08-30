import {
  createOrderSchema,
  updateOrderSchema,
  updateOrderStatusSchema,
} from "../schemas/order.schema";
import { ReadVariationDTO, Variation } from "./variation";

export type Status = "completed" | "waiting" | "canceled";

export class Order {
  id: number;
  userId: number;
  variations: Variation[];
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
  variations: [{ id: number; quantity: number }];
}

export interface UpdateOrder {
  userId?: number;
  variations?: [{ id: number; quantity: number }];
  totalPrice?: number;
}

export class ReadOrderDTO {
  id: number;
  userId: number;
  variations: ReadVariationDTO[];
  totalPrice: number;
  status: Status;

  constructor(
    id: number,
    userId: number,
    variations: ReadVariationDTO[],
    totalPrice: number,
    status: Status
  ) {
    this.id = id;
    this.userId = userId;
    this.variations = variations;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}
