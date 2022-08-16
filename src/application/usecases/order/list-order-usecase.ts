import { Order } from "../../../domain/entity/order";

export interface ListOrderUseCase {
  execute(filters: object): Promise<Order[]>
}