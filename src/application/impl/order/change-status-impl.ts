import { Status } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { ChangeOrderStatusUseCase } from "../../usecases/order/change-status-usecase";

export class ChangeOrderStatusImpl implements ChangeOrderStatusUseCase {
  constructor(private repository: OrderRepository) {}
  async execute(id: number, status: Status): Promise<void> {
    //Validate status and order exists

    await this.repository.changeStatus(id, status);
  }
}
