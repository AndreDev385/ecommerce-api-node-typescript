import { CreateOrder, Order, ReadOrderDTO } from "../../../domain/entity/order";

export interface CreateOrderUseCase {
  execute(order: CreateOrder): Promise<ReadOrderDTO | void>
}