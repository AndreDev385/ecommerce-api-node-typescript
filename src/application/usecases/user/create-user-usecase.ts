import { CreateUser, ReadUser } from "../../../domain/entity/user";

export interface CreateUserUseCase {
  execute(user: CreateUser): Promise<ReadUser>;
}
