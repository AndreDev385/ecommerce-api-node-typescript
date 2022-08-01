import { CreateUser, ReadUser } from "../../entity/user";

export interface UserRepository {
  create(user: CreateUser): Promise<ReadUser>
  findAll(): Promise<ReadUser[]>
  findOne(id: number): Promise<ReadUser>
  updateRole(id:number, role: string): Promise<ReadUser>
  deleteOne(id: number): Promise<void>
}