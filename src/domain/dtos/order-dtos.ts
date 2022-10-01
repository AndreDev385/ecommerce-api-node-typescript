import { typeCheck } from 'type-check';
import { OrderItem } from '../entity/order';

export class CreateOrderDTO {
  userId: string;
  items: Array<{ variationId: string; quantity: number; productName: string }>;
}

export class CreateOrder {
  userId: string;
  items: Array<{ variationId: string; quantity: number; productName: string }>;

  constructor({ userId, items }: CreateOrderDTO) {
    this.setUserId(userId);
    for (const item of items) {
      item.quantity = this.setQuantity(item.quantity);
      item.productName = this.setProductName(item.productName);
      item.variationId = this.setVariationId(item.variationId);
    }
    this.items = items;
  }

  setUserId(str: string) {
    if (!str) {
      throw new Error('User id is required');
    }

    if (!typeCheck('String', str)) {
      throw new Error('id should be a string');
    }

    this.userId = str;
  }

  setVariationId(str: string) {
    if (!str) {
      throw new Error('Variation id is required');
    }

    if (!typeCheck('String', str)) {
      throw new Error('Varition id should be a string');
    }
    return str;
  }

  setProductName(str: string) {
    if (!str) {
      throw new Error('Product name is required');
    }

    if (!typeCheck('String', str)) {
      throw new Error('Product name should be a string');
    }
    return str;
  }

  setQuantity(n: number) {
    if (!n) {
      throw new Error('Quantity is required');
    }

    if (!typeCheck('Number', n)) {
      throw new Error('Quantity should be a number');
    }
    return n;
  }
}

export class UpdateOrder {
  items: Array<{ variationId: string; quantity: number; productName: string }>;

  constructor({ items }: UpdateOrderDTO) {
    for (const item of items) {
      item.quantity = this.setQuantity(item.quantity);
      item.productName = this.setProductName(item.productName);
      item.variationId = this.setVariationId(item.variationId);
    }
    this.items = items;
  }

  setVariationId(str: string) {
    if (!str) {
      throw new Error('Variation id is required');
    }

    if (!typeCheck('String', str)) {
      throw new Error('Varition id should be a string');
    }
    return str;
  }

  setProductName(str: string) {
    if (!str) {
      throw new Error('Product name is required');
    }

    if (!typeCheck('String', str)) {
      throw new Error('Product name should be a string');
    }
    return str;
  }

  setQuantity(n: number) {
    if (!n) {
      throw new Error('Quantity is required');
    }

    if (!typeCheck('Number', n)) {
      throw new Error('Quantity should be a number');
    }
    return n;
  }
}

export interface UpdateOrderDTO {
  items: Array<{ variationId: string; quantity: number; productName: string }>;
}

export class ReadOrderDTO {
  id: string;
  userId: string;
  items: Item[];
  status: string;
  total: number;
}

export interface Item {
  id: string;
  name: string;
  variationId: string;
  quantity: number;
  total: number;
  orderId: string;
}
