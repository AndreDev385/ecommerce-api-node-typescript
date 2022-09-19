import { ReadUserDTO, User } from "../../../domain/entity/user";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { UpdateUserRoleUseCase } from "../../usecases/user/update-user-role-usecase";
import { CreateReadUserDTO } from "../../utils/createDtos";

export class UpdateUserRoleImpl implements UpdateUserRoleUseCase {
  userRepository: UserRepository;
  constructor(ur: UserRepository) {
    this.userRepository = ur;
  }

  async execute(id: number, role: string): Promise<ReadUserDTO> {
    User.validateUserRole(role);
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundError("User");
    await this.userRepository.updateRole(id, role);
    const result = await this.userRepository.findOne(id);
    return CreateReadUserDTO(result);
  }
}
