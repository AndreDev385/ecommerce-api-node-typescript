import { UpdateOrderDTO, Order, ReadOrderDTO } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { UpdateOrderUseCase } from "../../usecases/order/update-order-usecase";
import { CreateReadOrderDTO } from "../../utils/createDtos";

export class UpdateOrderImpl implements UpdateOrderUseCase {
  constructor(private repository: OrderRepository) {}
  async execute(id: number, order: UpdateOrderDTO): Promise<ReadOrderDTO> {
    // Validate order data
    Order.validateUpdateOrder(order)
    // Validate id

    // ->
    const result = await this.repository.updateOrder(id, order);
    return CreateReadOrderDTO(result)
  }
}
