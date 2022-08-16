import { CreateOrder, Order } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { CreateOrderUseCase } from "../../usecases/order/create-order-usecase";

export class CreateOrderImpl implements CreateOrderUseCase {
  constructor(private repository: OrderRepository) {}
  async execute(order: CreateOrder): Promise<Order> {
    //Validate order data

    //  ->
    return await this.repository.create(order);
  }
}
