import { ReadOrderDTO } from "../../../domain/dtos/order-dtos";

export interface FindOneOrderUseCase {
  execute(id: string): Promise<ReadOrderDTO>;
}
