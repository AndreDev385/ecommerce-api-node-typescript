import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Variation Domain Model', () => {
  const productId = v4()
  const price = 12.99
  const oPrice = 0.99
  const asset = new Asset('url')
  const attributes = [
    { name: 'color', value: 'black-white' },
    { name: 'size', value: '38' }
  ]
  const stock = 10

  describe('Test validations', () => {
    const string: any = '123'
    const negative = -12.9

    test('Test Price and offerPrice validations', () => {
      expect(() => new Variation(productId, string, attributes, stock, [asset])).toThrow(
        Error('Price should be a number')
      )

      expect(
        () => new Variation(productId, price, attributes, stock, [asset], string)
      ).toThrow(Error('Price should be a number'));

      expect(() => new Variation(productId, negative, attributes, stock, [asset])).toThrow(
        Error('Price should be greater than zero')
      )

      expect(
        () => new Variation(productId, price, attributes, stock, [asset], negative)
      ).toThrow(Error('Price should be greater than zero'));
    })

    test('Test productId Validations', () => {
      expect(() => new Variation(123 as any, price, attributes, stock, [asset])).toThrow(
        Error('productId should be a string')
      )
    });

    test('Test Empty attributes array', () => {
      expect(() => new Variation(productId, price, [], stock, [asset])).toThrow(
        Error('Insert some attributes')
      )
    });

    test('Test stock validations', () => {
      expect(() => new Variation(productId, price, attributes, -1, [asset])).toThrow(
        Error('Stock should be positive')
      )

      expect(() => new Variation(productId, price, attributes, string, [asset])).toThrow(
        Error('Stock should be a number')
      )
    });
  })

  test('Test constructor and getters', () => {
    const newPrice = 4.99
    const newStock = 2
    const newAttributes = [
      { name: 'color', value: 'green' },
      { name: 'size', value: '12' }
    ]
    const newAsset = new Asset('url')
    const variation = new Variation(productId, price, attributes, stock, [asset])

    variation.setPrice(newPrice);
    expect(variation.getData().price).toEqual(newPrice);

    variation.setAttributes(newAttributes);
    expect(variation.getData().attributes).toEqual(newAttributes);

    variation.setStock(newStock);
    expect(variation.getData().stock).toEqual(newStock);

    variation.addAsset(newAsset);
    expect(variation.getData().assets).toEqual([asset, newAsset]);

    expect(variation.getData().offerPrice).toBeNull();
    variation.setOfferPrice(price);
    expect(variation.getData().offerPrice).toEqual(price);

    expect(variation.getData().isAvaible).toBeTruthy();
    variation.setStock(0);
    expect(variation.getData().isAvaible).toBeFalsy;

    const variation2 = new Variation(productId, price, attributes, 0, [asset])
    expect(variation2.getData().isAvaible).toBeFalsy();
  })
});
