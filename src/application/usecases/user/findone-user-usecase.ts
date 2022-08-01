import { ReadUser } from "../../../domain/entity/user";

export interface FindOneUserUseCase {
  execute(id: number): Promise<ReadUser>;
}
