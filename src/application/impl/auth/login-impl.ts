import { UserRepository } from "../../../domain/repository/interface/user-repository";
import {
  LoginUseCase,
  Credentials,
  Jwt,
} from "../../usecases/auth/login-usecase";
import { User } from "../../../domain/entity/user";
import { GenerateRefreshTokenUseCase } from "../../usecases/auth/generate-refresh-token-usecase";
import { GenerateAccessTokenUseCase } from "../../usecases/auth/generate-access-token-usecase";
import { TokenRepository } from "../../../domain/repository/interface/token-repository";
import { NotFoundError } from "../../../domain/exceptions/exceptions";

export class LoginImpl implements LoginUseCase {
  userRepository: UserRepository;
  tokenRepository: TokenRepository;
  generateAccessToken: GenerateAccessTokenUseCase;
  generateRefreshToken: GenerateRefreshTokenUseCase;

  constructor(
    userRepo: UserRepository,
    tokenRepo: TokenRepository,
    generateAccessToken: GenerateAccessTokenUseCase,
    generateRefreshToken: GenerateRefreshTokenUseCase
  ) {
    this.userRepository = userRepo;
    this.tokenRepository = tokenRepo;
    this.generateAccessToken = generateAccessToken;
    this.generateRefreshToken = generateRefreshToken;
  }

  async execute(credentials: Credentials): Promise<Jwt> {
    User.validateCredentials(credentials)
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) throw new NotFoundError("User");

    await User.validatePassword(credentials.password, user.password);

    const token = this.generateAccessToken.execute(user.id, user.role);
    const refreshToken = this.generateRefreshToken.execute(user.id, user.role);

    const existToken = await this.tokenRepository.findByUserId(user.id);

    if (existToken) {
      await this.tokenRepository.updateToken(user.id, refreshToken);
    } else {
      await this.tokenRepository.create({
        token: refreshToken,
        userId: user.id,
        email: user.email,
      });
    }

    return {
      token,
      refreshToken,
    };
  }
}
