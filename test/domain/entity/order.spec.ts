import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Order, OrderItem } from '../../../src/domain/entity/order';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Order and OrderItem Domain Models', () => {
    let id = v4();
    let price = 14.99;
    let attributes = [
        { name: 'color', value: 'Black' },
        { name: 'size', value: '40' },
    ];
    let stock = 10;
    let asset = new Asset('url');
    let variation = new Variation(id, price, attributes, stock, [asset]);

    let name: any = 'Air zoom';
    let quantity = 2;
    let status = 'waiting';

    describe('Test functions', () => {
        let item = new OrderItem(variation, name, quantity);
        let order = new Order(id, status);
        test('Test OrderItem getters', () => {
            expect(item.getName()).toEqual(name);
            expect(item.getPrice()).toEqual(variation.getPrice());
            expect(item.getQuantity()).toEqual(quantity);
            expect(item.getTotal()).toEqual(variation.getPrice() * item.getQuantity());
        });

        test('Test Order getters', () => {
            expect(order.getUserId()).toEqual(id);
            expect(order.getItems()).toEqual([]);
            expect(order.getStatus()).toEqual(status);
            expect(order.getTotalPrice()).toBe(0);
        });

        test('Test orderItem setters', () => {
            let newName = 'Pegasus';
            let newQuantity = 12;

            item.setName(newName);
            expect(item.getName()).toEqual(newName);

            item.setQuantity(newQuantity);
            expect(item.getQuantity()).toEqual(newQuantity);
        });

        test('Test order setters', () => {
            let newStatus = 'completed';
            let newId = v4();
            let newItem = new OrderItem(variation, name, 3);

            order.setStatus(newStatus);
            expect(order.getStatus()).toEqual(newStatus);

            order.setUserId(newId);
            expect(order.getUserId()).toEqual(newId);

            order.addItem(item);
            expect(order.getItems()).toEqual([item]);

            expect(order.getTotalPrice()).toEqual(item.getTotal());

            order.addItem(newItem);
            expect(order.getItems()).toEqual([item, newItem]);
            expect(order.getTotalPrice()).toEqual(item.getTotal() + newItem.getTotal());
        });
    });

    describe('Test validations', () => {
        let number: any = 123;
        test('Test Order Item validations', () => {
            expect(() => new OrderItem(variation, number, quantity)).toThrow(
                Error('Name should be a string')
            );
            expect(() => new OrderItem(variation, name, name)).toThrow(
                Error('Quantity should be a number')
            );
            expect(() => new OrderItem(variation, name, 0)).toThrow(
                Error('Quantity should be 1 or greater')
            );
        });

        test('Test Order validations', () => {
            expect(() => new Order(id, number)).toThrow(Error('Status should be a string'));
            expect(() => new Order(id, 'in progress' as any)).toThrow(Error('Invalid status'));
        });
    });
});
