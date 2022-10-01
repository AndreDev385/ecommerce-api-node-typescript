import { v4 } from 'uuid';
import { CreateOrder, CreateOrderDTO, ReadOrderDTO } from '../../../domain/dtos/order-dtos';
import { Order, OrderItem } from '../../../domain/entity/order';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { OrderRepository } from '../../../domain/repository/interface/order-repository';
import { VariationRepository } from '../../../domain/repository/interface/variation-repository';
import { CreateOrderUseCase } from '../../usecases/order/create-order-usecase';

export class CreateOrderImpl implements CreateOrderUseCase {
  private static instance: CreateOrderUseCase;

  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly variationRepo: VariationRepository
  ) {}

  static getInstance(orderRepo: OrderRepository, variationRepo: VariationRepository) {
    if (!CreateOrderImpl.instance) {
      CreateOrderImpl.instance = new CreateOrderImpl(orderRepo, variationRepo);
    }
    return CreateOrderImpl.instance;
  }

  async execute(input: CreateOrderDTO): Promise<any> {
    input = new CreateOrder(input);

    let id = v4();
    const order = new Order({ id, userId: input.userId, status: 'waiting' });

    for (const item of input.items) {
      let variation = await this.variationRepo.findOne(item.variationId);

      if (!variation) {
        throw new NotFoundError();
      }
      if (item.quantity > variation.getData().stock) {
        throw new Error('There is no stock avaible');
      }
      let orderItem = new OrderItem({
        orderId: order.getData().id,
        variation,
        name: item.productName,
        quantity: item.quantity,
      });
      order.addItem(orderItem);
      variation.setStock(variation.getData().stock - item.quantity);
      await this.variationRepo.update(variation);
    }

    order.getTotalPrice();
    await this.orderRepo.create(order);

    return order.getData();
  }
}
