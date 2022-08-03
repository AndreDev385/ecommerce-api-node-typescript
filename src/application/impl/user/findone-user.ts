import { ReadUser } from "../../../domain/entity/user";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { FindOneUserUseCase } from "../../usecases/user/findone-user-usecase";

export class FindOneUserImpl implements FindOneUserUseCase {
  userRepository: UserRepository;
  constructor(ur: UserRepository) {
    this.userRepository = ur;
  }

  async execute(id: number): Promise<ReadUser> {
    const result = await this.userRepository.findOne(id);
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
