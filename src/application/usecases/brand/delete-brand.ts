import { Brand } from "../../../domain/entity/brand";

export interface DeleteBrandUseCase {
  execute(id: number): Promise<void>;
}
