import jwt from "jsonwebtoken";
import { config } from "../../../presentation/config";
import { IsValidRefreshTokenUseCase } from "../../usecases/auth/isvalid-refresh-token-usecase";

import { RefreshTokenUseCase } from "../../usecases/auth/refresh-token-usecase";
import { GenerateAccessTokenUseCase } from "../../usecases/auth/generate-access-token-usecase";

export class RefreshTokenImpl implements RefreshTokenUseCase {
  generateRefreshToken: GenerateAccessTokenUseCase;
  isValidRefreshToken: IsValidRefreshTokenUseCase;

  constructor(
    generateRefreshToken: GenerateAccessTokenUseCase,
    isValidRefreshToken: IsValidRefreshTokenUseCase
  ) {
    this.generateRefreshToken = generateRefreshToken;
    this.isValidRefreshToken = isValidRefreshToken;
  }

  execute(token: string): string {
    // valid RefreshToken missing
    this.isValidRefreshToken.execute(token);

    const user = jwt.verify(token, config.REFRESH_SECRET_KEY as jwt.Secret) as {
      id: number;
      role: string;
    };

    const accessToken = this.generateRefreshToken.execute(user.id, user.role);

    return accessToken;
  }
}
