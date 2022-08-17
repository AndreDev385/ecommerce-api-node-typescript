import { CreateOrder, Order, Status, UpdateOrder } from "../../entity/order";

export interface OrderRepository {
  create(order: { userId: number , totalPrice: number}): Promise<any>;
  findAll(filters: object): Promise<Order[]>;
  findById(id: number): Promise<Order>;
  updateOrder(id: number, order: UpdateOrder): Promise<Order>;
  changeStatus(id: number, status: Status): Promise<void>;
}
