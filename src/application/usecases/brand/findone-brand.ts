import { Brand, ReadBrandDTO } from "../../../domain/entity/brand";

export interface FindOneBrandUseCase {
  execute(id: number): Promise<ReadBrandDTO>;
}
