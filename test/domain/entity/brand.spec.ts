import { Brand } from '../../../src/domain/entity/brand';
import { Product } from '../../../src/domain/entity/product';
import { Asset } from '../../../src/domain/entity/asset';
import { v4 } from 'uuid';

describe('Test Brand Domain Model', () => {
  describe('Test Validations', () => {
    let id = v4();
    let name = 'Nike';
    let description = 'Sport brand';
    let products: Product[] = [];
    test('Name with less than 4 characters', () => {
      let wrongName = 'abc';
      expect(() => new Brand({ id, name: wrongName })).toThrow(
        Error('Name should have at least 4 characters')
      );
    });

    test('Name is not a string', () => {
      const name: any = 123;
      expect(() => new Brand({ id, name })).toThrow(Error('Name should be a string'));
    });

    test('Description should be a string', () => {
      const badDescription: any = 123;
      expect(() => new Brand({ id, name, description: badDescription })).toThrow(
        Error('Description should be a string')
      );
    });
  });

  describe('Getting data', () => {
    const id = v4();
    const name = 'Nike';
    const description = 'Sport brand';
    const asset = new Asset('url');
    const brand = new Brand({ id, name, description, asset });
    test('get brand data', () => {
      expect(brand.getData().id).toStrictEqual(id);
      expect(brand.getData().name).toStrictEqual(name);
      expect(brand.getData().slug).toEqual('nike');
      expect(brand.getData().description).toStrictEqual(description);
      expect(brand.getData().asset).toEqual(asset);
      expect(brand.getData().products).toEqual([]);
    });
  });

  describe('Test setting data', () => {
    const asset = new Asset('url');
    const product = new Product({ id: v4(), name: 'Air zoom', brandId: v4(), categoryId: v4() });

    const name = 'Nike';
    const description = 'Sport brand';
    const brand = new Brand({ id: v4(), name });

    brand.setDescription(description);
    expect(brand.getData().description).toEqual(description);

    brand.setAsset(asset);
    expect(brand.getData().asset).toEqual(asset);

    brand.addProduct(product);
    expect(brand.getData().products).toEqual([product]);

    brand.addProduct(product);
    expect(brand.getData().products).toEqual([product, product]);
  });

  test('test brand constructor with products', () => {
    const name = 'Nike';
    const product = new Product({ id: v4(), name: 'Air zoom', brandId: v4(), categoryId: v4() });
    const brand = new Brand({ id: v4(), name, products: [product] });
    expect(brand.getData().products).toEqual([product]);
  });
});
