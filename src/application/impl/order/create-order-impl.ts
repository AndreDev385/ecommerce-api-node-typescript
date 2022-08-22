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

    // Crear la orden
    const new_order = await this.orderRepo.create({ userId: order.userId });

    // añadir variaciones, cantidad y calcular precio
    let price = 0;
    for (const { id, quantity } of order.variations) {
      const variation = await this.variationRepo.findOne(id);
      if (!variation.isAvaible) {
        throw new Error("Product not avaible");
      }
      price += variation.normalPrice * quantity;
      variation.Order_Variations = {
        quantity,
      };
      await new_order.addVariation(variation, { through: { quantity } });
    }

    // actualizar orden
    await this.orderRepo.updateOrder(order.userId, { totalPrice: price });

    // return
    return this.orderRepo.findById(order.userId);
  }
}