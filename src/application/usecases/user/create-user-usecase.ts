import { CreateUserDTO, ReadUserDTO } from '../../../domain/dtos/user-dtos';

export interface CreateUserUseCase {
    execute(user: CreateUserDTO): Promise<ReadUserDTO>;
}
