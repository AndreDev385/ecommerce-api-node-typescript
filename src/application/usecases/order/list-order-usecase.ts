import { Order, ReadOrderDTO } from "../../../domain/entity/order";

export interface ListOrderUseCase {
  execute(filters: object): Promise<ReadOrderDTO[]>
}