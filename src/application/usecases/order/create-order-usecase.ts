import { CreateOrder, Order } from "../../../domain/entity/order";

export interface CreateOrderUseCase {
  execute(order: CreateOrder): Promise<Order>
}