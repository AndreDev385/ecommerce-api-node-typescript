import { CreateUser, ReadUser } from "../../domain/entity/user";
import { UserRepository } from "../../domain/repository/interface/user-repository";
import { UserDataSource } from "../data-source/user-data-source";

export class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource;
  constructor(uds: UserDataSource) {
    this.userDataSource = uds;
  }

  create(user: CreateUser): Promise<ReadUser> {
    const result = this.userDataSource.create(user);
    return result;
  }

  findAll(): Promise<ReadUser[]> {
    const result = this.userDataSource.findAll();
    return result;
  }

  findOne(id: number): Promise<ReadUser> {
    const result = this.userDataSource.findOne(id);
    return result;
  }

  updateRole(id: number, role: string): Promise<ReadUser> {
    const result = this.userDataSource.updateRole(id, role);
    return result;
  }

  async deleteOne(id: number): Promise<void> {
    await this.userDataSource.deleteOne(id);
  }
}
