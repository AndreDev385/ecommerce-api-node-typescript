import {
  CreateUser,
  User,
} from "../../../domain/entity/user";
import { UserRepository } from "../../../domain/repository/interface/user-repository";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequilizeUserRepository implements UserRepository {
  private database: SequelizeWrapper;
  constructor(database: SequelizeWrapper) {
    this.database = database;
  }

  async create(user: CreateUser): Promise<User> {
    const result = await this.database.create(user);
    return result
  }

  async findAll(): Promise<User[]> {
    const result = await this.database.findAll({ where: { isActive: true } });
    return result
  }

  async findOne(id: number): Promise<User | null> {
    const result = await this.database.findOne({
      where: { id, isActive: true },
    });
    return result
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.database.findOne({
      where: { email, isActive: true },
    });
    return result
  }

  async updateRole(id: number, role: string): Promise<User | null> {
    await this.database.update({ role }, { where: { id, isActive: true } });
    const result = await this.findOne(id);
    return result;
  }

  async deleteOne(id: number): Promise<void> {
    await this.database.update({ isActive: false }, { where: { id } });
  }
}