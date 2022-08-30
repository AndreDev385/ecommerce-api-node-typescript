import { Order, ReadOrderDTO } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { FindOneOrderUseCase } from "../../usecases/order/findone-order-usecase";
import { CreateReadOrderDTO } from "../../utils/createDtos";

export class FindOneOrderImpl implements FindOneOrderUseCase {
  constructor(private repository: OrderRepository) {}
  async execute(id: number): Promise<ReadOrderDTO> {
    const result = await this.repository.findById(id);
    return CreateReadOrderDTO(result);
  }
}
