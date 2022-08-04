import { ReadUser, User } from "../../../domain/entity/user";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { UpdateUserRoleUseCase } from "../../usecases/user/update-user-role-usecase";

export class UpdateUserRoleImpl implements UpdateUserRoleUseCase {
  userRepository: UserRepository;
  constructor(ur: UserRepository) {
    this.userRepository = ur;
  }

  async execute(id: number, role: string): Promise<ReadUser> {
    User.validateUserRole(role);
    const user = await this.userRepository.findOne(id)
    if (!user) throw new NotFoundError("User");
    const result = await this.userRepository.updateRole(id, role);
    return result
  }
}
