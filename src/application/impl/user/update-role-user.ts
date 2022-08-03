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
    const result = await this.userRepository.updateRole(id, role);
    if (!result) throw new NotFoundError("User");
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      phoneNumber: result.phoneNumber,
    };
  }
}
