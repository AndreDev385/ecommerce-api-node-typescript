import { Brand, ReadBrandDTO } from "../../../domain/entity/brand";

export interface ListBrandUseCase {
  execute(): Promise<ReadBrandDTO[]>;
}
