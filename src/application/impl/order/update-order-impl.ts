import { ReadOrderDTO, UpdateOrder, UpdateOrderDTO } from '../../../domain/dtos/order-dtos';
import { Order } from '../../../domain/entity/order';
import { OrderRepository } from '../../../domain/repository/interface/order-repository';
import { UpdateOrderUseCase } from '../../usecases/order/update-order-usecase';

export class UpdateOrderImpl implements UpdateOrderUseCase {
  private static instance: UpdateOrderUseCase;

  constructor(private readonly repository: OrderRepository) {}

  static getInstance(repo: OrderRepository) {
    if (!UpdateOrderImpl.instance) {
      UpdateOrderImpl.instance = new UpdateOrderImpl(repo);
    }

    return UpdateOrderImpl.instance;
  }

  async execute(id: string, order: UpdateOrderDTO): Promise<any> {
    order = new UpdateOrder(order);
    const oldOrderData = await this.repository.findById(id);

    const result = await this.repository.updateOrder(id, order);
    return result.getData();
  }
}
