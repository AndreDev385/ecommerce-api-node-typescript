import { Order, UpdateOrder } from "../../../domain/entity/order";

export interface UpdateOrderUseCase {
  execute(id: number, order: UpdateOrder): Promise<Order>;
}
