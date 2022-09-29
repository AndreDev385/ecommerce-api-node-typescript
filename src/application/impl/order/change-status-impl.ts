import { Order, Status } from '../../../domain/entity/order'
import { OrderRepository } from '../../../domain/repository/interface/order-repository'
import { VariationRepository } from '../../../domain/repository/interface/variation-repository'
import { ChangeOrderStatusUseCase } from '../../usecases/order/change-status-usecase'

export class ChangeOrderStatusImpl implements ChangeOrderStatusUseCase {
  constructor (
    private readonly repository: OrderRepository
    // private variationRepo: VariationRepository
  ) {}

  async execute (id: number, status: Status): Promise<void> {
    // Validate status and order exists

    const order = await this.repository.findById(id)

    for (const v of order.variations) {
    }

    await this.repository.changeStatus(id, status);
  }
}
