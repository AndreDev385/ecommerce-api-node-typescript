import { ReadUser } from "../../../domain/entity/user";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { DeleteUserUseCase } from "../../usecases/user/delete-user-usecase";

export class DeleteUserImpl implements DeleteUserUseCase {
  userRepository: UserRepository;
  constructor(ur: UserRepository) {
    this.userRepository = ur;
  }

  async execute(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundError("User");
    await this.userRepository.deleteOne(id);
  }
}
