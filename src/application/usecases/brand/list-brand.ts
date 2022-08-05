import { Brand } from "../../../domain/entity/brand";

export interface ListBrandUseCase {
  execute(): Promise<Brand[]>;
}
