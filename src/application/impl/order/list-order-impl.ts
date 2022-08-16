import { Order } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { ListOrderUseCase } from "../../usecases/order/list-order-usecase";

export class ListOrderImpl implements ListOrderUseCase {
  constructor(private repository: OrderRepository) {}

  async execute(filters: object): Promise<Order[]> {
    // validate filters

    // ->
    return await this.repository.findAll(filters);
  }
}
