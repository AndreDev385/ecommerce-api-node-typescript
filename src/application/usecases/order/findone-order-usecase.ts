import { Order } from "../../../domain/entity/order";

export interface FindOneOrderUseCase {
  execute(id: number): Promise<Order>;
}
