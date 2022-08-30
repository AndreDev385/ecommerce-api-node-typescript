import { CreateUser, ReadUser, ReadUserDTO } from "../../../domain/entity/user";

export interface CreateUserUseCase {
  execute(user: CreateUser): Promise<ReadUserDTO>;
}
