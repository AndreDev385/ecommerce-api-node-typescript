import { User, ReadUser, CreateUser } from "../../domain/entity/user";

export interface UserDataSource {
  create(user: CreateUser): Promise<ReadUser>;
  findAll(): Promise<ReadUser[]>;
  findOne(id: number): Promise<ReadUser>
  updateRole(id:number, role: string): Promise<ReadUser>
  deleteOne(id: number): Promise<void>
}
