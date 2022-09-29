import { Order, ReadOrderDTO } from '../../../domain/entity/order'
import { OrderRepository } from '../../../domain/repository/interface/order-repository'
import { ListOrderUseCase } from '../../usecases/order/list-order-usecase'
import { CreateReadOrderDTO } from '../../utils/createDtos'

export class ListOrderImpl implements ListOrderUseCase {
  constructor (private readonly repository: OrderRepository) {}

  async execute (filters: object): Promise<ReadOrderDTO[]> {
    // validate filters

    // ->
    const orders = await this.repository.findAll(filters);
    return orders.map((o) => CreateReadOrderDTO(o));
  }
}
