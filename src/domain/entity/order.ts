import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/order-dtos';
import {
    createOrderSchema,
    updateOrderSchema,
    updateOrderStatusSchema,
} from '../schemas/order.schema';
import { ReadVariationDTO, Variation } from './variation';

export type Status = 'completed' | 'waiting' | 'canceled';

export class Order {
    id: number;
    userId: number;
    variations: Variation[];
    totalPrice: number;
    status: Status;

    static validateCreateOrder(data: CreateOrderDTO) {
        const { error } = createOrderSchema.validate(data, { abortEarly: false });
        if (error) throw error;
    }

    static validateChangeOrderStatus(status: Status) {
        const { error } = updateOrderStatusSchema.validate(status, {
            abortEarly: false,
        });
        if (error) throw error;
    }

    static validateUpdateOrder(data: UpdateOrderDTO) {
        const { error } = updateOrderSchema.validate(data, { abortEarly: false });
        if (error) throw error;
    }
}
