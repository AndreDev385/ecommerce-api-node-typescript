import { CreateToken, Token } from "../../../domain/entity/token";
import { TokenRepository } from "../../../domain/repository/interface/token-repository";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeTokenRepository implements TokenRepository {
  private database;
  constructor(database: SequelizeWrapper) {
    this.database = database;
  }

  async create(token: CreateToken): Promise<Token> {
    const result = await this.database.create(token)
    return result
  }

  async findByUserId(userId: number): Promise<Token> {
    const result = await this.database.findOne({ where: { userId } });
    return result
  }

  async findByToken(token: string): Promise<Token> {
    const result = await this.database.findOne({ where: { token } });
    return result
  }

  async updateToken(userId: number, token: string): Promise<Token> {
    const result = await this.database.update({token}, {where: {userId}})
    return result
  }
}
