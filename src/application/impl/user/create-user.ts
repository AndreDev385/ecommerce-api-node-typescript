import { User, ReadUserDTO, CreateUserDTO } from "../../../domain/entity/user";
import { CreateUserUseCase } from "../../usecases/user/create-user-usecase";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { CreateReadUserDTO } from "../../utils/createDtos";

export class CreateUserImpl implements CreateUserUseCase {
  userRepository: UserRepository;

  constructor(us: UserRepository) {
    this.userRepository = us;
  }

  async execute(user: CreateUserDTO): Promise<ReadUserDTO> {
    User.validateCreateUserData(user);
    const emailInUse = await this.userRepository.findByEmail(user.email);
    if (emailInUse) throw new Error("Email already in use");
    user.password = await User.hashPassword(user.password);
    const result = await this.userRepository.create(user);
    return CreateReadUserDTO(result)
  }
}
