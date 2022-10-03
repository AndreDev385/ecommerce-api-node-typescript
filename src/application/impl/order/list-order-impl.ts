import { ReadOrderDTO } from '../../../domain/dtos/order-dtos';
import { Order } from '../../../domain/entity/order';
import { OrderRepository } from '../../../domain/repository/interface/order-repository';
import { ListOrderUseCase } from '../../usecases/order/list-order-usecase';

export class ListOrderImpl implements ListOrderUseCase {
  private static instance: ListOrderUseCase;

  constructor(private readonly repository: OrderRepository) {}

  static getInstance(repo: OrderRepository) {
    if (!ListOrderImpl.instance) {
      ListOrderImpl.instance = new ListOrderImpl(repo);
    }
    return ListOrderImpl.instance;
  }

  async execute(filters: object): Promise<ReadOrderDTO[]> {
    const orders = await this.repository.findAll(filters);
    return orders;
  }
}
