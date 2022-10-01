import { User } from '../../../domain/entity/user';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { UserRepository } from '../../../domain/repository/interface/user-repository';
import { OrderModel } from '../../orm/sequelize/models/order.model';
import { SequelizeWrapper } from './db-sequelize-wrapper';

export class SequelizeUserRepository implements UserRepository {
  private static instance: UserRepository;

  constructor(private readonly database: SequelizeWrapper) {}

  static getInstance(db: SequelizeWrapper) {
    if (!SequelizeUserRepository.instance) {
      SequelizeUserRepository.instance = new SequelizeUserRepository(db);
    }

    return SequelizeUserRepository.instance;
  }

  async create(user: User): Promise<User> {
    const result = await this.database.create(user);
    return new User(result);
  }

  async findAll(): Promise<User[]> {
    const result = await this.database.findAll({
      include: OrderModel,
    });
    return result.map((u) => new User(u));
  }

  async findOne(id: string): Promise<User | null> {
    const result = await this.database.findOne({
      where: { id },
      include: OrderModel,
    });
    if (!result) return null;
    return new User(result);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.database.findOne({
      where: { email },
    });
    if (!result) return null;
    return new User(result);
  }

  async updateRole(id: string, role: string): Promise<User> {
    await this.database.update({ role }, { where: { id } });
    const result = await this.findOne(id);
    if (!result) throw new NotFoundError('User');
    return result;
  }

  async deleteOne(id: string): Promise<void> {
    await this.database.delete({ where: { id } });
  }
}
