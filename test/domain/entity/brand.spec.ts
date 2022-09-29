import { Brand } from '../../../src/domain/entity/brand';
import { Product } from '../../../src/domain/entity/product';
import { Asset } from '../../../src/domain/entity/asset';

describe('Test Brand Domain Model', () => {
  describe('Test Validations', () => {
    test('Name with less than 4 characters', () => {
      expect(() => new Brand('123')).toThrow(Error('Name should have at least 4 characters'));
    })

    test('Name is not a string', () => {
      const name: any = 123
      expect(() => new Brand(name)).toThrow(Error('Name should be a string'));
    })

    test('Description should be a string', () => {
      const badDescription: any = 123
      expect(() => new Brand('Nike', badDescription)).toThrow(
        Error('Description should be a string')
      )
    });
  })

  describe('Getting data', () => {
    const name = 'Nike'
    const description = 'Sport brand'
    const asset = new Asset('url')
    const brand = new Brand(name, description, asset)
    test('get brand data', () => {
      expect(brand.getData().name).toStrictEqual(name);
      expect(brand.getData().slug).toEqual('nike');
      expect(brand.getData().description).toStrictEqual(description);
      expect(brand.getData().asset).toEqual(asset);
      expect(brand.getData().products).toEqual([]);
    })
  });

  describe('Test setting data', () => {
    const asset = new Asset('url')
    const product = new Product('air', 'brandId', 'categoryId', '', [], asset)

    const name = 'Nike'
    const description = 'Sport brand'
    const brand = new Brand(name, undefined, undefined, [])

    brand.setDescription(description);
    expect(brand.getData().description).toEqual(description);

    brand.setAsset(asset);
    expect(brand.getData().asset).toEqual(asset);

    brand.addProduct(product);
    expect(brand.getData().products).toEqual([product]);

    brand.addProduct(product);
    expect(brand.getData().products).toEqual([product, product]);
  })

  test('test brand constructor with products', () => {
    const name = 'Nike'
    const product = new Product('air', 'brandId', 'categoryId', '', [], new Asset('url'))
    const brand = new Brand(name, undefined, undefined, [product])
    expect(brand.getData().products).toEqual([product]);
  })
});
