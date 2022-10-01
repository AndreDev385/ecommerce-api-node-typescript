import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { UserRepository } from '../../../domain/repository/interface/user-repository';
import { DeleteUserUseCase } from '../../usecases/user/delete-user-usecase';

export class DeleteUserImpl implements DeleteUserUseCase {
  private static instance: DeleteUserUseCase;

  constructor(private userRepository: UserRepository) {}

  static getInstance(repo: UserRepository) {
    if (!DeleteUserImpl.instance) {
      DeleteUserImpl.instance = new DeleteUserImpl(repo);
    }

    return DeleteUserImpl.instance;
  }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundError('User');
    await this.userRepository.deleteOne(id);
  }
}
