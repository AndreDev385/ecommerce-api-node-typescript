import {
  CreateOrderDTO,
  Order,
  UpdateOrderDTO,
  Status,
} from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { SequelizeWrapper } from "./db-sequelize-wrapper";
import { VariationModel } from "../../orm/sequelize/models/variation.model";
import { UserModel } from "../../orm/sequelize/models/user.model";

export class SequelizeOrderRepository implements OrderRepository {
  constructor(
    private orderDb: SequelizeWrapper,
    //private variationDb: SequelizeWrapper
  ) {}
  async create(order: { userId: number; }): Promise<any> {
    return await this.orderDb.create(order)
  }

  async findAll(filters: object): Promise<Order[]> {

    return await this.orderDb.findAll({
      where: filters,
      include: {
        model: VariationModel,
        through: {
          attributes: [],
        },
      },
    });
  }

  async findById(id: number): Promise<Order> {
    return await this.orderDb.findOne({
      where: { id },
      include: [VariationModel],
    });
  }

  async updateOrder(id: number, order: UpdateOrderDTO): Promise<Order> {
    return await this.orderDb.update(order, { where: { id } });
  }

  async changeStatus(id: number, status: Status): Promise<void> {
    return await this.orderDb.update({ status }, { where: { id } });
  }
}
