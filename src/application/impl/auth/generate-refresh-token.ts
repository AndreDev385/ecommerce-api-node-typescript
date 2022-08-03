import jwt from "jsonwebtoken";

import { config } from "../../../presentation/config";
import { GenerateRefreshTokenUseCase } from "../../usecases/auth/generate-refresh-token-usecase";

export class GenerateAndSignRefreshTokenImpl implements GenerateRefreshTokenUseCase {
  execute(userId: number, role: string): string {
    const payload = {
      userId,
      role
    };

    const token = jwt.sign(payload, config.REFRESH_SECRET_KEY as jwt.Secret, {
      expiresIn: config.JWT_REFRESH_EXPIRATION,
    });

    return token;
  }
}
