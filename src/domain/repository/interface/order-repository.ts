import { Order, Status } from '../../entity/order';

export interface OrderRepository {
    create(order: { userId: number }): Promise<any>;
    findAll(filters: object): Promise<Order[]>;
    findById(id: string): Promise<Order>;
    updateOrder(order: Order): Promise<Order>;
    changeStatus(id: string, status: Status): Promise<void>;
}
