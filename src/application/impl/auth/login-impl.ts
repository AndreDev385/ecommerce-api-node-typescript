import { UserRepository } from '../../../domain/repository/interface/user-repository';
import { LoginUseCase, Credentials, Jwt } from '../../usecases/auth/login-usecase';
import { User } from '../../../domain/entity/user';
import { GenerateRefreshTokenUseCase } from '../../usecases/auth/generate-refresh-token-usecase';
import { GenerateAccessTokenUseCase } from '../../usecases/auth/generate-access-token-usecase';
import { TokenRepository } from '../../../domain/repository/interface/token-repository';
import { NotFoundError } from '../../../domain/exceptions/exceptions';

export class LoginImpl implements LoginUseCase {
  constructor(
    private userRepo: UserRepository,
    private tokenRepo: TokenRepository,
    private generateAccessToken: GenerateAccessTokenUseCase,
    private generateRefreshToken: GenerateRefreshTokenUseCase
  ) {}

  async execute(credentials: Credentials): Promise<Jwt> {
    // User.validateCredentials(credentials);
    const user = await this.userRepo.findByEmail(credentials.email);
    if (!user) throw new NotFoundError('User');

    // await User.validatePassword(credentials.password, user.password);

    const token = this.generateAccessToken.execute(user.getData().id, user.getData().role);
    const refreshToken = this.generateRefreshToken.execute(user.getData().id, user.getData().role);

    const existToken = await this.tokenRepo.findByUserId(user.getData().id);

    if (existToken) {
      await this.tokenRepo.updateToken(user.getData().id, refreshToken);
    } else {
      await this.tokenRepo.create({
        token: refreshToken,
        userId: user.getData().id,
        email: user.getData().email,
      });
    }

    return {
      token,
      refreshToken,
    };
  }
}
