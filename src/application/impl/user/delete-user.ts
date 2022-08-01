import { ReadUser } from "../../../domain/entity/user";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { DeleteUserUseCase } from "../../usecases/user/delete-user-usecase";

export class DeleteUserImpl implements DeleteUserUseCase {
  userRepository: UserRepository;
  constructor(ur: UserRepository) {
    this.userRepository = ur;
  }

  async execute(id: number): Promise<void> {
    await this.userRepository.deleteOne(id);
  }
}
