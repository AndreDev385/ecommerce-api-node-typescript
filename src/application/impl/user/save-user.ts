import { v4 } from 'uuid';

import { User } from '../../../domain/entity/user';
import { CreateUserUseCase } from '../../usecases/user/create-user-usecase';
import { UserRepository } from '../../../domain/repository/interface/user-repository';
import { CreateUserDTO, ReadUserDTO } from '../../../domain/dtos/user-dtos';

export class CreateUserImpl implements CreateUserUseCase {
  private static instance: CreateUserUseCase;

  constructor(private readonly userRepository: UserRepository) {}

  static getInstance(us: UserRepository) {
    if (!CreateUserImpl.instance) {
      CreateUserImpl.instance = new CreateUserImpl(us);
    }
    return CreateUserImpl.instance;
  }

  async execute(input: CreateUserDTO): Promise<ReadUserDTO> {
    let result: User;
    const id = v4();
    const user = new User({ ...input, id });
    const existUser = await this.userRepository.findByEmail(user.getData().email);

    if (existUser) {
      throw new Error('User already exist!');
    }

    result = await this.userRepository.create(user);

    return new ReadUserDTO(result.getData());
  }
}
