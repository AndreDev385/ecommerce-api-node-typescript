import { Order } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { FindOneOrderUseCase } from "../../usecases/order/findone-order-usecase";

export class FindOneOrderImpl implements FindOneOrderUseCase {
  constructor(private repository: OrderRepository){}
  async execute(id: number): Promise<Order> {
    return await this.repository.findById(id)
  }
}