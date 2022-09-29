import { Order } from '../../entity/order';

export interface OrderRepository {
  create: (order: Order) => Promise<any>;
  findAll: (filters: object) => Promise<Order[]>;
  findById: (id: string) => Promise<Order>;
  updateOrder: (order: Order) => Promise<Order>;
  changeStatus: (id: string, status: string) => Promise<void>;
}
