import { ReadOrderDTO, UpdateOrderDTO } from '../../../domain/dtos/order-dtos';

export interface UpdateOrderUseCase {
  execute: (id: string, order: UpdateOrderDTO) => Promise<ReadOrderDTO>;
}
