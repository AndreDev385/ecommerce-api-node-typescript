import { ReadUserDTO } from '../../../domain/dtos/user-dtos';

export interface ListUserUseCase {
  execute: () => Promise<ReadUserDTO[]>
}
