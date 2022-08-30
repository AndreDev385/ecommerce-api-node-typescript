import { Brand, ReadBrandDTO } from "../../../domain/entity/brand";

export interface CreateBrandUseCase {
  execute(brand: Brand): Promise<ReadBrandDTO>;
}
