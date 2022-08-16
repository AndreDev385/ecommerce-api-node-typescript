export type Status = "completed" | "waiting" | "canceled"

export class Order {
  id: number;
  userId: number;
  variationIds: number[];
  totalPrice: number;
  status: Status
}

export interface CreateOrder {
  userId: number
  variationIds: number[]
  totalPrice: number
}

export interface UpdateOrder {
  userId?: number
  variationIds?: number[]
  totalPrice?: number
}
