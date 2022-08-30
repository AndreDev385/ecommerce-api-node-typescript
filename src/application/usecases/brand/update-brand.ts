import { Brand, ReadBrandDTO, UpdateBrandDTO } from "../../../domain/entity/brand";

export interface UpdateBrandUseCase {
  execute(id: number, data: UpdateBrandDTO): Promise<ReadBrandDTO>;
}
