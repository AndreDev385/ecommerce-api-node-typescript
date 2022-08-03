import jwt from 'jsonwebtoken'

import { config } from '../../../presentation/config';
import { GenerateAccessTokenUseCase } from '../../usecases/auth/generate-access-token-usecase';

export class GenerateAndSignAccessTokenImpl implements GenerateAccessTokenUseCase {
  execute(id: number, role: string): string{
    const payload = {
      userId: id,
      role: role
    }

    const token = jwt.sign(payload, config.SECRET_KEY as jwt.Secret, {
      expiresIn: config.JWT_EXPIRATION
    })

    return token
  }
}