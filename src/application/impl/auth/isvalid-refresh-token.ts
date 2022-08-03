import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { TokenRepository } from "../../../domain/repository/interface/token-repository";
import { IsValidRefreshTokenUseCase } from "../../usecases/auth/isvalid-refresh-token-usecase";

export class IsValidRefreshTokenImpl implements IsValidRefreshTokenUseCase {
  tokenRepository: TokenRepository

  constructor(tokenRepository: TokenRepository){
    this.tokenRepository = tokenRepository
  }

  execute(token: string): void {
    const refresToken = this.tokenRepository.findByToken(token)
    if(!refresToken){
      throw new NotFoundError()
    }
  }
}