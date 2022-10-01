import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Brand } from '../../../src/domain/entity/brand';
import { Category } from '../../../src/domain/entity/category';

import { Product } from '../../../src/domain/entity/product';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Produc Domain Model', () => {
  const id = v4();
  const name = 'Air';
  const brand = new Brand({ id: v4(), name: 'Nike' });
  const category = new Category({ id: v4(), name: 'Men' });
  const description = 'shoes for runners';
  const asset = new Asset('url');

  describe('test validation data', () => {
    test('It should return error', () => {
      const wrongName: any = 123;
      expect(
        () =>
          new Product({
            id,
            name: wrongName,
            brandId: brand.getData().id,
            categoryId: category.getData().id,
          })
      ).toThrow(Error('Name should be a string'));

      expect(
        () =>
          new Product({
            id,
            name,
            brandId: brand.getData().id,
            categoryId: category.getData().id,
            description: wrongName,
          })
      ).toThrow(Error('Description should be a string'));

      expect(
        () =>
          new Product({
            id,
            name,
            brandId: brand.getData().id,
            categoryId: category.getData().id,
            description,
            tags: [wrongName],
          })
      ).toThrow(Error('Tag should be a string'));
    });
  });

  test('test constructor and getters', () => {
    const product = new Product({
      id,
      name,
      brandId: brand.getData().id,
      categoryId: category.getData().id,
    });
    const variations = new Variation({
      id: v4(),
      productId: product.getData().id,
      price: 10,
      attributes: [
        { name: 'color', value: 'black' },
        { name: 'size', value: '49' },
      ],
      stock: 10,
      assets: [],
      offerPrice: 12,
    });

    const product2 = new Product({
      id: v4(),
      name,
      brandId: brand.getData().id,
      categoryId: category.getData().id,
      description,
      tags: ['shoes'],
      asset,
      variations: [variations],
    });
    expect(product2.getData().variations).toEqual([variations]);

    product.addVariation(variations);

    expect(product.getData().description).toBeNull();
    expect(product.getData().asset).toBeNull();

    expect(product.getData().name).toEqual(name);
    expect(product.getData().categoryId).toEqual(category.getData().id);
    expect(product.getData().brandId).toEqual(brand.getData().id);

    product.setDescription(description);
    expect(product.getData().description).toEqual(description);

    product.setAsset(asset);
    expect(product.getData().asset).toEqual(asset);

    product.addTags('shoes');
    expect(product.getData().tags).toEqual(['shoes']);
    expect(product.getData().variations).toEqual([variations]);
  });
});
