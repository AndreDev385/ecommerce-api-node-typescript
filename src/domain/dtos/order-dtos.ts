import { Status } from '../entity/order';
import { ReadVariationDTO } from '../entity/variation';

export interface CreateOrderDTO {
  userId: number
  variations: [{ id: number, quantity: number }]
}

export interface UpdateOrderDTO {
  userId?: number
  variations?: [{ id: number, quantity: number }]
  totalPrice?: number
}

export class ReadOrderDTO {
  id: number;
  userId: number;
  variations: ReadVariationDTO[];
  totalPrice: number;
  status: Status;

  constructor (
    id: number,
    userId: number,
    variations: ReadVariationDTO[],
    totalPrice: number,
    status: Status
  ) {
    this.id = id;
    this.userId = userId;
    this.variations = variations;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}
