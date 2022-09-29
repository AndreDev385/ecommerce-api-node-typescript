import { ReadUser, ReadUserDTO } from '../../../domain/entity/user'

export interface UpdateUserRoleUseCase {
  execute: (id: number, role: string) => Promise<ReadUserDTO>
}
