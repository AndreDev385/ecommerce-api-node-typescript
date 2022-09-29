import { ReadUserDTO } from '../../../domain/entity/user'
import { UserRepository } from '../../../domain/repository/interface/user-repository'
import { ListUserUseCase } from '../../usecases/user/list-user-usecase'
import { CreateReadUserDTO } from '../../utils/createDtos'

export class ListUserImpl implements ListUserUseCase {
  userRepository: UserRepository;
  constructor (us: UserRepository) {
    this.userRepository = us;
  }

  async execute (): Promise<ReadUserDTO[]> {
    const result = await this.userRepository.findAll();
    return result.map((u) => CreateReadUserDTO(u));
  }
}
