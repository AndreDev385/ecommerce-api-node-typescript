import { ReadUser } from "../../../domain/entity/user";

export interface DeleteUserUseCase {
  execute(id: number): Promise<void>;
}
