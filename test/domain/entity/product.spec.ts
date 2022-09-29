import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Brand } from '../../../src/domain/entity/brand';
import { Category } from '../../../src/domain/entity/category';

import { Product } from '../../../src/domain/entity/product';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Produc Domain Model', () => {
  const name = 'Air'
  const brand = new Brand('Nike')
  const category = new Category('Men')
  const description = 'shoes for runners'
  const asset = new Asset('url')

  describe('test validation data', () => {
    test('It should return error', () => {
      const wrongName: any = 123
      expect(() => new Product(wrongName, brand.getData().id, category.getData().id)).toThrow(
        Error('Name should be a string')
      )

      expect(
        () => new Product(name, brand.getData().id, category.getData().id, wrongName)
      ).toThrow(Error('Description should be a string'));

      expect(
        () =>
          new Product(name, brand.getData().id, category.getData().id, description, [
            wrongName
          ])
      ).toThrow(Error('Tag should be a string'));
    })
  });

  test('test constructor and getters', () => {
    const product = new Product(name, brand.getData().id, category.getData().id)
    const variations = new Variation(
      product.getData().id,
      10,
      [
        { name: 'color', value: 'black' },
        { name: 'size', value: '49' }
      ],
      10,
      [],
      12
    );

    const product2 = new Product(
      name,
      brand.getData().id,
      category.getData().id,
      description,
      ['shoes'],
      asset,
      [variations]
    );
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
  })
});
