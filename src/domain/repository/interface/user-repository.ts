import { CreateUser, User } from "../../entity/user";

export interface UserRepository {
  create(user: CreateUser): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateRole(id: number, role: string): Promise<User | null>;
  deleteOne(id: number): Promise<void>;
}
