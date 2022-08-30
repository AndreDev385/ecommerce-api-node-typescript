import { ReadUser, ReadUserDTO } from "../../../domain/entity/user";

export interface FindOneUserUseCase {
  execute(id: number): Promise<ReadUserDTO>;
}
