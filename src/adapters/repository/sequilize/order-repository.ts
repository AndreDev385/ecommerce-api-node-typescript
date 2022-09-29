import { Order } from '../../../domain/entity/order';
import { OrderRepository } from '../../../domain/repository/interface/order-repository';
import { SequelizeWrapper } from './db-sequelize-wrapper';
import { VariationModel } from '../../orm/sequelize/models/variation.model';
import { UserModel } from '../../orm/sequelize/models/user.model';

export class SequelizeOrderRepository implements OrderRepository {
  private static instance: OrderRepository;

  constructor(private readonly database: SequelizeWrapper) {}

  static getInstance(db: SequelizeWrapper) {
    if (!SequelizeOrderRepository.instance) {
      SequelizeOrderRepository.instance = new SequelizeOrderRepository(db);
    }
    return SequelizeOrderRepository.instance;
  }

  async create(order: Order) {
    const result = await this.database.create(order.getData());
    return new Order(result);
  }
  async findAll(filters: object) {
    const result = await this.database.findAll({ where: filters });
    return result.map((o) => new Order(o));
  }
  async findById(id: string) {
    const result = await this.database.findOne({ where: { id } });
    return new Order(result);
  }
  async updateOrder(order: Order) {
    await this.database.update(order.getData(), {
      where: { id: order.getData().id },
    });
    const result = await this.database.findOne({
      where: { id: order.getData().id },
      include: [VariationModel],
    });
    return new Order(result);
  }

  async changeStatus(id: string, status: string) {
    await this.database.update({ status }, { where: { id } });
  }
}
