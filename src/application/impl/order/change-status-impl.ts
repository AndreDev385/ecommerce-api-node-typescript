import { Order } from '../../../domain/entity/order';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { OrderRepository } from '../../../domain/repository/interface/order-repository';
import { VariationRepository } from '../../../domain/repository/interface/variation-repository';
import { ChangeOrderStatusUseCase } from '../../usecases/order/change-status-usecase';

export class ChangeOrderStatusImpl implements ChangeOrderStatusUseCase {
  private static instance: ChangeOrderStatusUseCase;

  constructor(
    private readonly orderRepo: OrderRepository,
    private variationRepo: VariationRepository
  ) {}

  static getInstance(repo: OrderRepository, variationRepo: VariationRepository) {
    if (!ChangeOrderStatusImpl.instance) {
      ChangeOrderStatusImpl.instance = new ChangeOrderStatusImpl(repo, variationRepo);
    }
    return ChangeOrderStatusImpl.instance;
  }

  async execute(id: string, status: string): Promise<void> {
    if (status !== 'waiting' && status !== 'completed' && status !== 'canceled') {
      throw new Error('Invalid status');
    }
    let order = await this.orderRepo.findById(id);
    if (order.status == 'canceled') {
      throw new Error('This order is already canceled');
    }
    if (order.status == 'completed') {
      throw new Error('This order is already completed');
    }
    if (status == 'canceled') {
      for (const item of order.items) {
        let variation = await this.variationRepo.findOne(item.variationId);
        if (!variation) {
          throw new NotFoundError('Variation');
        }
        variation.setStock(variation.getData().stock + item.quantity);
        await this.variationRepo.update(variation);
      }
    }
    await this.orderRepo.changeStatus(id, status);
  }
}
