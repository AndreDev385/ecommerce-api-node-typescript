import { User } from '../../entity/user';

export interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updateRole(id: string, role: string): Promise<User>;
    deleteOne(id: string): Promise<void>;
}
