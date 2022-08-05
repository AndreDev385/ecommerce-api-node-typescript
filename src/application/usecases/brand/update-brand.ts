import { Brand, UpdateBrand } from "../../../domain/entity/brand";

export interface UpdateBrandUseCase {
  execute(id: number, data: UpdateBrand): Promise<Brand>;
}
