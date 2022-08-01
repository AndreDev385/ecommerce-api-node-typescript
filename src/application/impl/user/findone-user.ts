import { ReadUser } from "../../../domain/entity/user";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { FindOneUserUseCase } from "../../usecases/user/findone-user-usecase";

export class FindOneUserImpl implements FindOneUserUseCase {
  userRepository: UserRepository;
  constructor(ur: UserRepository) {
    this.userRepository = ur;
  }

  execute(id: number): Promise<ReadUser> {
    const result = this.userRepository.findOne(id);
    return result;
  }
}
