import { UpdateOrder, Order } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { UpdateOrderUseCase } from "../../usecases/order/update-order-usecase";

export class UpdateOrderImpl implements UpdateOrderUseCase {
  constructor(private repository: OrderRepository) {}
  async execute(id: number, order: UpdateOrder): Promise<Order> {
    // Validate order data

    // Validate id

    // ->
    return await this.repository.updateOrder(id, order);
  }
}
