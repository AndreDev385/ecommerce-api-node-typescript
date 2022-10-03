import { ReadUserDTO } from '../../../domain/dtos/user-dtos';
import { User } from '../../../domain/entity/user';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { UserRepository } from '../../../domain/repository/interface/user-repository';
import { UpdateUserRoleUseCase } from '../../usecases/user/update-user-role-usecase';

export class UpdateUserRoleImpl implements UpdateUserRoleUseCase {
  private static instance: UpdateUserRoleUseCase;

  constructor(private readonly userRepository: UserRepository) {}

  static getInstance(repo: UserRepository) {
    if (!UpdateUserRoleImpl.instance) {
      UpdateUserRoleImpl.instance = new UpdateUserRoleImpl(repo);
    }
    return UpdateUserRoleImpl.instance;
  }

  async execute(id: string, role: string): Promise<ReadUserDTO> {
    const existUser = await this.userRepository.findOne(id);
    if (!existUser) throw new NotFoundError('User');
    existUser.setRole(role);
    await this.userRepository.updateRole(existUser.getData().id, existUser.getData().role);
    return new ReadUserDTO(existUser.getData());
  }
}
