import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Order, OrderItem } from '../../../src/domain/entity/order';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Order and OrderItem Domain Models', () => {
  const id = v4();
  const price = 14.99;
  const attributes = [
    { name: 'color', value: 'Black' },
    { name: 'size', value: '40' },
  ];
  const stock = 10;
  const asset = new Asset('url');
  const variation = new Variation({ id, productId: id, price, attributes, stock, assets: [asset] });

  const name: any = 'Air zoom';
  const quantity = 2;
  const status = 'waiting';

  describe('Test functions', () => {
    const item = new OrderItem(variation, name, quantity);
    const order = new Order({ userId: id, status });
    test('Test OrderItem getters', () => {
      expect(item.getData().name).toEqual(name);
      expect(item.getData().variation.getData().price).toEqual(variation.getData().price);
      expect(item.getData().quantity).toEqual(quantity);
      expect(item.getTotal()).toEqual(variation.getData().price * item.getData().quantity);
    });

    test('Test Order getters', () => {
      expect(order.getData().userId).toEqual(id);
      expect(order.getData().items).toEqual([]);
      expect(order.getData().status).toEqual(status);
      expect(order.getTotalPrice()).toBe(0);
    });

    test('Test orderItem setters', () => {
      const newName = 'Pegasus';
      const newQuantity = 12;

      item.setName(newName);
      expect(item.getData().name).toEqual(newName);

      item.setQuantity(newQuantity);
      expect(item.getData().quantity).toEqual(newQuantity);
    });

    test('Test order setters', () => {
      const newStatus = 'completed';
      const newId = v4();
      const newItem = new OrderItem(variation, name, 3);

      order.setStatus(newStatus);
      expect(order.getData().status).toEqual(newStatus);

      order.setUserId(newId);
      expect(order.getData().userId).toEqual(newId);

      order.addItem(item);
      expect(order.getData().items).toEqual([item]);

      expect(order.getTotalPrice()).toEqual(item.getTotal());

      order.addItem(newItem);
      expect(order.getData().items).toEqual([item, newItem]);
      expect(order.getTotalPrice()).toEqual(item.getTotal() + newItem.getTotal());
    });
  });

  describe('Test validations', () => {
    const number: any = 123;
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
      expect(() => new Order({ userId: id, status: number })).toThrow(
        Error('Status should be a string')
      );
      expect(() => new Order({ userId: id, status: 'in progress' as any })).toThrow(
        Error('Invalid status')
      );
    });
  });
});
