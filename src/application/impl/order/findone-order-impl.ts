import { ReadOrderDTO } from '../../../domain/dtos/order-dtos';
import { OrderRepository } from '../../../domain/repository/interface/order-repository';
import { FindOneOrderUseCase } from '../../usecases/order/findone-order-usecase';

export class FindOneOrderImpl implements FindOneOrderUseCase {
  private static instance: FindOneOrderUseCase;

  constructor(private readonly repository: OrderRepository) {}

  static getInstance(repo: OrderRepository) {
    if (!FindOneOrderImpl.instance) {
      FindOneOrderImpl.instance = new FindOneOrderImpl(repo);
    }

    return FindOneOrderImpl.instance;
  }

  async execute(id: string): Promise<ReadOrderDTO> {
    const result = await this.repository.findById(id);

    console.log(result);

    return result;
  }
}
