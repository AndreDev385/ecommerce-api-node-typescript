import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Variation Domain Model', () => {
  const productId = v4();
  const price = 12.99;
  const oPrice = 0.99;
  const asset = new Asset('url');
  const attributes = [
    { name: 'color', value: 'black-white' },
    { name: 'size', value: '38' },
  ];
  const stock = 10;

  describe('Test validations', () => {
    const string: any = '123';
    const negative = -12.9;

    test('Test Price and offerPrice validations', () => {
      expect(
        () =>
          new Variation({ id: v4(), productId, price: string, attributes, stock, assets: [asset] })
      ).toThrow(Error('Price should be a number'));

      expect(
        () =>
          new Variation({
            id: v4(),
            productId,
            price,
            attributes,
            stock,
            assets: [asset],
            offerPrice: string,
          })
      ).toThrow(Error('Price should be a number'));

      expect(
        () =>
          new Variation({
            id: v4(),
            productId,
            price: negative,
            attributes,
            stock,
            assets: [asset],
          })
      ).toThrow(Error('Price should be greater than zero'));

      expect(
        () =>
          new Variation({
            id: v4(),
            productId,
            price,
            attributes,
            stock,
            assets: [asset],
            offerPrice: negative,
          })
      ).toThrow(Error('Price should be greater than zero'));
    });

    test('Test productId Validations', () => {
      let number: any = 123;
      expect(
        () =>
          new Variation({ id: v4(), productId: number, price, attributes, stock, assets: [asset] })
      ).toThrow(Error('productId should be a string'));
    });

    test('Test Empty attributes array', () => {
      expect(
        () => new Variation({ id: v4(), productId, price, attributes: [], stock, assets: [asset] })
      ).toThrow(Error('Insert some attributes'));
    });

    test('Test stock validations', () => {
      expect(
        () => new Variation({ id: v4(), productId, price, attributes, stock: -1, assets: [asset] })
      ).toThrow(Error('Stock should be positive'));

      expect(
        () =>
          new Variation({ id: v4(), productId, price, attributes, stock: string, assets: [asset] })
      ).toThrow(Error('Stock should be a number'));
    });
  });

  test('Test constructor and getters', () => {
    let id = v4();
    const newPrice = 4.99;
    const newStock = 2;
    const newAttributes = [
      { name: 'color', value: 'green' },
      { name: 'size', value: '12' },
    ];
    const newAsset = new Asset('url');
    const variation = new Variation({ id, productId, price, attributes, stock, assets: [asset] });

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

    const variation2 = new Variation({
      id,
      productId,
      price,
      attributes,
      stock: 0,
      assets: [asset],
    });
    expect(variation2.getData().isAvaible).toBeFalsy();
  });
});
