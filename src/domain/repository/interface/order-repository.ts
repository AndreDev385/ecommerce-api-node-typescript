import { ReadOrderDTO, UpdateOrderDTO } from '../../dtos/order-dtos';
import { Order } from '../../entity/order';

export interface OrderRepository {
  create: (order: Order) => Promise<any>;
  findAll: (filters: object) => Promise<ReadOrderDTO[]>;
  findById: (id: string) => Promise<ReadOrderDTO>;
  updateOrder: (id: string, items: UpdateOrderDTO) => Promise<Order>;
  changeStatus: (id: string, status: string) => Promise<void>;
}
