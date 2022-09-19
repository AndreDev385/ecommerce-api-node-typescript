import { ReadOrderDTO } from '../../../domain/dtos/order-dtos';

export interface ListOrderUseCase {
    execute(filters: object): Promise<ReadOrderDTO[]>;
}
