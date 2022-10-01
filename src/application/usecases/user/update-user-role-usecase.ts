import { ReadUserDTO } from '../../../domain/dtos/user-dtos';

export interface UpdateUserRoleUseCase {
  execute: (id: string, role: string) => Promise<ReadUserDTO>;
}
