import { Order, OrderItem } from '../../../domain/entity/order';
import { OrderRepository } from '../../../domain/repository/interface/order-repository';
import { SequelizeWrapper } from './db-sequelize-wrapper';
import { VariationModel } from '../../orm/sequelize/models/variation.model';
import { UserModel } from '../../orm/sequelize/models/user.model';
import { UpdateOrderDTO } from '../../../domain/dtos/order-dtos';
import { Item, OrderModel } from '../../orm/sequelize/models/order.model';

export class SequelizeOrderRepository implements OrderRepository {
  private static instance: OrderRepository;

  constructor(
    private readonly orderDb: SequelizeWrapper,
    private readonly itemDb: SequelizeWrapper
  ) {}

  static getInstance(orderDb: SequelizeWrapper, itemDb: SequelizeWrapper) {
    if (!SequelizeOrderRepository.instance) {
      SequelizeOrderRepository.instance = new SequelizeOrderRepository(orderDb, itemDb);
    }
    return SequelizeOrderRepository.instance;
  }

  async create(order: Order) {
    await this.orderDb.create(order.getData());

    for (const item of order.getData().items) {
      await this.itemDb.create({
        name: item.getData().name,
        orderId: item.getData().orderId,
        variationId: item.getData().variation.getData().id,
        total: item.getTotal(),
        quantity: item.getData().quantity,
      });
    }
  }

  async findAll(filters: object) {
    const result = await this.orderDb.findAll({
      include: [{ model: Item }],
    });
    return result;
  }

  async findById(id: string) {
    const result = await this.orderDb.findOne({
      where: { id },
      include: { model: Item },
    });
    return result;
  }

  async updateOrder(id: string, orderItems: UpdateOrderDTO) {
    await this.orderDb.update(orderItems.items, {
      where: { id },
    });
    const result = await this.orderDb.findOne({
      where: { id },
      include: [VariationModel],
    });
    let order = new Order(result);
    for (const item of result.items) {
      order.addItem(item);
    }
    order.getTotalPrice();
    return order;
  }

  async changeStatus(id: string, status: string) {
    await this.orderDb.update({ status }, { where: { id } });
  }
}
