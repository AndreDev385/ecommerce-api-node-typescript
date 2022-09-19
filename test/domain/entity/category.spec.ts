import exp from 'constants';
import { v4 as uuid } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Brand } from '../../../src/domain/entity/brand';

import { Category } from '../../../src/domain/entity/category';
import { Product } from '../../../src/domain/entity/product';
import { slugify } from '../../../src/domain/utils/slugify';

describe('Test Category Domain Model', () => {
    let id = uuid();
    let name = 'Men';
    let description = 'clothes for men';
    let tags = ['men', 'clothes for men', 'papa'];
    let product = new Product('id', 'air', 'brandId', 'categoryId', '', [], []);
    let asset = new Asset('url', id);

    test('Test constructor and getters', () => {
        //slug generation
        const spy = jest.spyOn(slugify, 'convert');

        let category = new Category(name, id, description, tags, [product], asset);

        expect(category.getId()).toEqual(id);
        expect(category.getName()).toEqual(name);
        expect(category.getDescription()).toEqual(description);
        expect(category.getSlug()).toEqual('men');
        expect(category.getTags()).toEqual(tags);
        expect(category.getProducts()).toEqual([product]);
        expect(category.getAsset()).toEqual(asset);

        // slug test
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(name);
    });

    describe('Test validators', () => {
        test('Name is not a string', () => {
            let number: any = 123;
            expect(() => new Category(number, id, description)).toThrow(
                Error('Name should be a string')
            );
        });
        test('Name is to short', () => {
            let toShortName: any = 'xs';
            expect(() => new Category(toShortName, id, description)).toThrow(
                Error('Name should have at least 3 characters')
            );
        });
        test('Description is not a string', () => {
            let number: any = 12334;
            expect(() => new Category(name, id, number)).toThrow(
                Error('Description should be a string')
            );
        });
        test('Tags is not a string', () => {
            let numberTags: Array<any> = [12, 431];
            expect(() => new Category(name, id, description, numberTags)).toThrow(
                Error('Tag should be a string')
            );
        });
    });

    describe('Test setters functions', () => {
        let category = new Category(name);
        test('id setter', () => {
            let id = uuid();
            expect(category.getId()).toBeUndefined();
            category.setId(id);

            expect(category.getId()).toEqual(id);

            category.setId(uuid());
            expect(category.getId()).toEqual(id);
        });

        test('name setter', () => {
            expect(category.getName()).toEqual(name);

            category.setName('Women');
            expect(category.getName()).toEqual('Women');
        });

        test('description setter', () => {
            expect(category.getDescription()).toBeUndefined();
            category.setDescription(description);
            expect(category.getDescription()).toEqual(description);
        });

        test('slug setter', () => {
            expect(category.getSlug()).toEqual('men');
            category.setSlug('Men Category');
            expect(category.getSlug()).toEqual('men-category');
            expect(() => category.setSlug(123 as any)).toThrow(
                Error('Slug should be a string')
            );
        });
    });
});
