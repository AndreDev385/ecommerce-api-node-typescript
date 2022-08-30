import { CreateUser, ReadUserDTO, User } from "../../entity/user";

export interface UserRepository {
  create(user: CreateUser): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  updateRole(id: number, role: string): Promise<User>;
  deleteOne(id: number): Promise<void>;
}
