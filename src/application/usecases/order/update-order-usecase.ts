import { Order, ReadOrderDTO, UpdateOrder } from "../../../domain/entity/order";

export interface UpdateOrderUseCase {
  execute(id: number, order: UpdateOrder): Promise<ReadOrderDTO>;
}
