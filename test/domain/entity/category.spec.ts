import exp from 'constants';
import { v4 as uuid, v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Brand } from '../../../src/domain/entity/brand';

import { Category } from '../../../src/domain/entity/category';
import { Product } from '../../../src/domain/entity/product';
import { slugify } from '../../../src/domain/utils/slugify';

describe('Test Category Domain Model', () => {
  const id = v4();
  const name = 'Men';
  const description = 'clothes for men';
  const tags = ['men', 'clothes for men', 'papa'];
  const asset = new Asset('url');
  const product = new Product({ id, name: 'Air', brandId: v4(), categoryId: v4() });

  test('Test constructor and getters', () => {
    // slug generation
    const spy = jest.spyOn(slugify, 'convert');

    const category = new Category({ id, name, description, tags, products: [product], asset });

    expect(category.getData().name).toEqual(name);
    expect(category.getData().description).toEqual(description);
    expect(category.getData().slug).toEqual('men');
    expect(category.getData().tags).toEqual(tags);
    expect(category.getData().products).toEqual([product]);
    expect(category.getData().asset).toEqual(asset);

    // slug test
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(name);
  });

  describe('Test validators', () => {
    test('Name is not a string', () => {
      const number: any = 123;
      expect(() => new Category({ id, name: number })).toThrow(Error('Name should be a string'));
    });
    test('Name is to short', () => {
      const toShortName: any = 'xs';
      expect(() => new Category({ id, name: toShortName })).toThrow(
        Error('Name should have at least 3 characters')
      );
    });
    test('Description is not a string', () => {
      const number: any = 12334;
      expect(() => new Category({ id, name, description: number })).toThrow(
        Error('Description should be a string')
      );
    });
    test('Tags is not a string', () => {
      const numberTags: any[] = [12, 431];
      expect(() => new Category({ id, name, description, tags: numberTags })).toThrow(
        Error('Tag should be a string')
      );
    });
  });

  describe('Test setters functions', () => {
    const category = new Category({ id, name });

    test('name setter', () => {
      expect(category.getData().name).toEqual(name);

      category.setName('Women');
      expect(category.getData().name).toEqual('Women');
    });

    test('description setter', () => {
      expect(category.getData().description).toBeNull();
      category.setDescription(description);
      expect(category.getData().description).toEqual(description);
    });

    test('slug setter', () => {
      expect(category.getData().slug).toEqual('men');
      category.setSlug('Men Category');
      expect(category.getData().slug).toEqual('men-category');
      expect(() => category.setSlug(123 as any)).toThrow(Error('Slug should be a string'));
    });
  });
});
