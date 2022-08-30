import { Order, ReadOrderDTO } from "../../../domain/entity/order";

export interface FindOneOrderUseCase {
  execute(id: number): Promise<ReadOrderDTO>;
}
