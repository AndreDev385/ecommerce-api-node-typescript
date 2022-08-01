import { UserDataSource } from "../user-data-source";
import { SequelizeWrapper } from "./user-sequelize-wrapper";
import { CreateUser, ReadUser } from "../../../domain/entity/user";

export class SequelizeUserDataSource implements UserDataSource {
  private database: SequelizeWrapper;
  constructor(database: SequelizeWrapper) {
    this.database = database;
  }

  async create(user: CreateUser): Promise<ReadUser> {
    const result = await this.database.create(user);
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      phoneNumber: result.phoneNumber,
    };
  }

  async findAll(): Promise<ReadUser[]> {
    const result = await this.database.findAll({ where: { isActive: true } });
    return result.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      role: item.role,
      phoneNumber: item.phoneNumber,
    }));
  }

  async findOne(id: number): Promise<ReadUser> {
    const result = await this.database.findOne({
      where: { id, isActive: true },
    });
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      phoneNumber: result.phoneNumber,
    };
  }

  async updateRole(id: number, role: string): Promise<ReadUser> {
    await this.database.updateRole(id, role);
    const result = await this.findOne(id)
    return result
  }

  async deleteOne(id: number): Promise<void> {
    await this.database.deleteOne(id);
  }
}
