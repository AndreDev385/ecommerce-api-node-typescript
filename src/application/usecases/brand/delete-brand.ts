import { Brand } from "../../../domain/entity/brand";

export interface DeleteBrandUseCase {
  execute(id: string): Promise<void>;
}
