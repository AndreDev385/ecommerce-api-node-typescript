import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Brand } from '../../../src/domain/entity/brand';
import { Category } from '../../../src/domain/entity/category';

import { Product } from '../../../src/domain/entity/product';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Produc Domain Model', () => {
    let name = 'Air';
    let brand = new Brand('Nike');
    let category = new Category('Men');
    let description = 'shoes for runners';
    let asset = new Asset('url');

    describe('test validation data', () => {
        test('It should return error', () => {
            let wrongName: any = 123;
            expect(() => new Product(wrongName, brand.getId(), category.getId())).toThrow(
                Error('Name should be a string')
            );

            expect(() => new Product(name, brand.getId(), category.getId(), wrongName)).toThrow(
                Error('Description should be a string')
            );

            expect(
                () =>
                    new Product(
                        name,
                        brand.getId() as string,
                        category.getId() as string,
                        description,
                        [wrongName]
                    )
            ).toThrow(Error('Tag should be a string'));
        });
    });

    test('test constructor and getters', () => {
        let product = new Product(
            name,
            brand.getId(),
            category.getId(),
            description,
            ['shoes'],
            asset,
            []
        );
        let variations = new Variation(
            product.getId(),
            10,
            [
                { name: 'color', value: 'black' },
                { name: 'size', value: '49' },
            ],
            10,
            [],
            12
        );

        product.addVariation(variations);

        expect(product.getName()).toEqual(name);
        expect(product.getCategoryId()).toEqual(category.getId());
        expect(product.getBrandId()).toEqual(brand.getId());
        expect(product.getDescription()).toEqual(description);
        expect(product.getTags()).toEqual(['shoes']);
        expect(product.getAsset()).toEqual(asset);
        expect(product.getVariations()).toEqual([variations]);
    });
});
