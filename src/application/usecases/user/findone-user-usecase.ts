import { ReadUserDTO } from '../../../domain/dtos/user-dtos';

export interface FindOneUserUseCase {
  execute: (id: string) => Promise<ReadUserDTO>
}
