import { Order, ReadOrderDTO, UpdateOrderDTO } from "../../../domain/entity/order";

export interface UpdateOrderUseCase {
  execute(id: number, order: UpdateOrderDTO): Promise<ReadOrderDTO>;
}
