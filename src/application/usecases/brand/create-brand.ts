import { Brand } from "../../../domain/entity/brand";

export interface CreateBrandUseCase {
  execute(brand: Brand): Promise<Brand>;
}
