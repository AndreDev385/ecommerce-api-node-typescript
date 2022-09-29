import { ReadUserDTO } from '../../../domain/entity/user'
import { NotFoundError } from '../../../domain/exceptions/exceptions'
import { UserRepository } from '../../../domain/repository/interface/user-repository'
import { FindOneUserUseCase } from '../../usecases/user/findone-user-usecase'
import { CreateReadUserDTO } from '../../utils/createDtos'

export class FindOneUserImpl implements FindOneUserUseCase {
  userRepository: UserRepository;
  constructor (ur: UserRepository) {
    this.userRepository = ur;
  }

  async execute (id: number): Promise<ReadUserDTO> {
    const result = await this.userRepository.findOne(id);
    if (!result) throw new NotFoundError('User')
    return CreateReadUserDTO(result)
  }
}
