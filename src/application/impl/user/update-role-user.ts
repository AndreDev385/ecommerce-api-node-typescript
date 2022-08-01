import { ReadUser } from "../../../domain/entity/user";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { UpdateUserRoleUseCase } from "../../usecases/user/update-user-role-usecase";

export class UpdateUserRoleImpl implements UpdateUserRoleUseCase {
  userRepository: UserRepository
  constructor(ur: UserRepository){
    this.userRepository = ur
  }

  execute(id: number, role: string): Promise<ReadUser> {
    const result = this.userRepository.updateRole(id, role)
    return result
  }
}