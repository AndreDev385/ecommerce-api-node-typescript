import { CreateOrderDTO, ReadOrderDTO } from '../../../domain/dtos/order-dtos';

export interface CreateOrderUseCase {
  execute: (order: CreateOrderDTO) => Promise<ReadOrderDTO | void>
}
