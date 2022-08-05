import { Brand } from "../../../domain/entity/brand";

export interface FindOneBrandUseCase {
  execute(id: number): Promise<Brand>;
}
