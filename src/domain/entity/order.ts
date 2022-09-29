import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { Variation } from './variation';

type Status = string | 'waiting' | 'canceled' | 'completed';

export class OrderItem {
  private readonly variation: Variation;
  private name: string;
  private quantity: number;

  constructor(variation: Variation, name: string, quantity: number) {
    this.variation = variation;
    this.setName(name);
    this.setQuantity(quantity);
  }

  setQuantity(n: number) {
    if (n < 1) {
      throw new Error('Quantity should be 1 or greater');
    }
    if (!typeCheck('Number', n)) {
      throw new Error('Quantity should be a number');
    }
    this.quantity = n;
  }

  setName(name: string): void {
    if (!typeCheck('String', name)) {
      throw new Error('Name should be a string');
    }
    this.name = name;
  }

  getTotal(): number {
    return this.variation.getData().price * this.quantity;
  }

  getData() {
    return {
      name: this.name,
      variation: this.variation,
      quantity: this.quantity,
    };
  }
}

export class Order {
  private id: string;
  private userId: string;
  private total: number | null;
  private status: Status;
  private readonly items: OrderItem[] = [];

  constructor({ userId, status }: { userId: string; status: string }) {
    this.setId();
    this.setUserId(userId);
    this.setStatus(status);
    this.total = null;
  }

  private setId(): void {
    this.id = v4();
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  setStatus(status: string) {
    if (!typeCheck('String', status)) {
      throw new Error('Status should be a string');
    }
    if (status !== 'completed' && status !== 'canceled' && status !== 'waiting') {
      throw new Error('Invalid status');
    }

    this.status = status;
  }

  getTotalPrice(): number {
    if (this.total === null) {
      console.log('entry in if', this.total);
      const items = this.items;
      let totalPrice = 0;
      for (const item of items) {
        const itemPrice = item.getTotal();
        totalPrice += itemPrice;
      }
      this.total = totalPrice;
    }

    return this.total;
  }

  addItem(item: OrderItem) {
    if (this.items.push(item)) {
      this.total = null;
    }
  }

  getData() {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
      status: this.status,
      total: this.getTotalPrice(),
    };
  }
}
