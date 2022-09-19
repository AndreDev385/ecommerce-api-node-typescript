import { CreateToken, Token } from '../../dtos/token-dtos';

export interface TokenRepository {
    create(token: CreateToken): Promise<Token>;
    findByUserId(userId: string): Promise<Token>;
    findByToken(token: string): Promise<Token>;
    updateToken(userId: string, token: string): Promise<Token>;
}
