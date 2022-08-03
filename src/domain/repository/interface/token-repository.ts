import { CreateToken, Token } from "../../entity/token";

export interface TokenRepository {
  create(token: CreateToken): Promise<Token>
  findByUserId(userId: number): Promise<Token>
  findByToken(token: string): Promise<Token>
  updateToken(userId: number, token: string): Promise<Token>
}
