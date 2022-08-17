import { CreateOrder, Order } from "../../../domain/entity/order";
import { Variation } from "../../../domain/entity/variation";
import { OrderRepository } from "../../../domain/repository/interface/order-repository";
import { VariationRepository } from "../../../domain/repository/interface/variation-repository";
import { CreateOrderUseCase } from "../../usecases/order/create-order-usecase";

export class CreateOrderImpl implements CreateOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private variationRepo: VariationRepository
  ) {}
  async execute(order: CreateOrder): Promise<Order> {
    //Validate order data
    Order.validateCreateOrder(order);

    // find variations and calculate totalPrice
    let variations: Variation[] = [];
    let price = 0;
    order.variationIds.forEach(async (id) => {
      const variation = await this.variationRepo.findOne(id);
      variations.push(variation);
      price += variation.normalPrice;
    });

    // add Variations to order
    const new_order = await this.orderRepo.create({
      userId: order.userId,
      totalPrice: price,
    });
    variations.forEach(async (v) => {
      await new_order.addVariation(v);
    });

    await this.orderRepo.updateOrder(new_order.id, { totalPrice: price });
    return await this.orderRepo.findById(new_order.id);
  }
}
