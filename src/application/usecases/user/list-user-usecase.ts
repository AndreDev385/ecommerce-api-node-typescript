import { ReadUser, ReadUserDTO } from "../../../domain/entity/user";

export interface ListUserUseCase {
  execute(): Promise<ReadUserDTO[]>;
}
