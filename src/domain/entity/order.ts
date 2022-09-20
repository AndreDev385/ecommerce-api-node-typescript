import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { Variation } from './variation';

type Status = string | 'waiting' | 'canceled' | 'completed';

export class OrderItem {
    private variation: Variation;
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

    getQuantity(): number {
        return this.quantity;
    }

    getPrice(): number {
        return this.variation.getPrice();
    }

    setName(name: string): void {
        if (!typeCheck('String', name)) {
            throw new Error('Name should be a string');
        }
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getTotal(): number {
        return this.getPrice() * this.getQuantity();
    }
}

export class Order {
    private id: string;
    private userId: string;
    private total: number | null;
    private status: Status;
    private items: Array<OrderItem> = [];

    constructor(userId: string, status: Status) {
        this.setId();
        this.setUserId(userId);
        this.setStatus(status);
        this.total = null;
    }

    private setId(): void {
        this.id = v4();
    }

    getId(): string {
        return this.id;
    }

    setUserId(id: string): void {
        this.userId = id;
    }

    getUserId(): string {
        return this.userId;
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

    getStatus(): Status {
        return this.status;
    }

    getTotalPrice(): number {
        if (this.total === null) {
            console.log("entry in if", this.total)
            let items = this.getItems();
            let totalPrice = 0;
            for (const item of items) {
                let itemPrice = item.getTotal();
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

    getItems(): Array<OrderItem> {
        return this.items;
    }
}
