import { ReadUser } from "../../../domain/entity/user";

export interface ListUserUseCase {
  execute(): Promise<ReadUser[]>;
}
