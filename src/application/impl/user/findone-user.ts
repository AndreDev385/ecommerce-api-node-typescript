import { ReadUserDTO } from '../../../domain/dtos/user-dtos';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { UserRepository } from '../../../domain/repository/interface/user-repository';
import { FindOneUserUseCase } from '../../usecases/user/findone-user-usecase';

export class FindOneUserImpl implements FindOneUserUseCase {
  private static instance: FindOneUserImpl;
  constructor(private userRepository: UserRepository) {}

  static getInstance(repo: UserRepository) {
    if (!FindOneUserImpl.instance) {
      FindOneUserImpl.instance = new FindOneUserImpl(repo);
    }

    return FindOneUserImpl.instance;
  }

  async execute(id: string): Promise<ReadUserDTO> {
    const result = await this.userRepository.findOne(id);
    if (!result) throw new NotFoundError('User');
    return new ReadUserDTO(result.getData());
  }
}
