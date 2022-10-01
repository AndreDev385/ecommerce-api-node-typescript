import { ReadUserDTO } from '../../../domain/dtos/user-dtos';
import { UserRepository } from '../../../domain/repository/interface/user-repository';
import { ListUserUseCase } from '../../usecases/user/list-user-usecase';

export class ListUserImpl implements ListUserUseCase {
  private static instance: ListUserUseCase;
  constructor(private userRepository: UserRepository) {}

  static getInstance(repo: UserRepository) {
    if (!ListUserImpl.instance) {
      ListUserImpl.instance = new ListUserImpl(repo);
    }
    return ListUserImpl.instance;
  }

  async execute(): Promise<ReadUserDTO[]> {
    const result = await this.userRepository.findAll();
    return result.map((u) => new ReadUserDTO(u.getData()));
  }
}
