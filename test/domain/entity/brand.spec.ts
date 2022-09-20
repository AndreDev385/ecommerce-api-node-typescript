import { Brand } from '../../../src/domain/entity/brand';
import { Product } from '../../../src/domain/entity/product';
import { Asset } from '../../../src/domain/entity/asset';

describe('Test Brand Domain Model', () => {
    describe('Test Validations', () => {
        test('Name with less than 4 characters', () => {
            expect(() => new Brand('123')).toThrow(Error('Name should have at least 4 characters'));
        });

        test('Name is not a string', () => {
            let name: any = 123;
            expect(() => new Brand(name)).toThrow(Error('Name should be a string'));
        });

        test('Description should be a string', () => {
            let badDescription: any = 123;
            expect(() => new Brand('Nike', badDescription)).toThrow(
                Error('Description should be a string')
            );
        });
    });

    describe('Test constructor', () => {
        // Passing all properties
    });

    describe('Getting data', () => {
        let name = 'Nike';
        let description = 'Sport brand';
        let asset = new Asset('url');
        let brand = new Brand(name, description, asset);
        test('get brand data', () => {
            expect(brand.getName()).toStrictEqual(name);
            expect(brand.getDescription()).toStrictEqual(description);
            expect(brand.getAsset()).toEqual(asset);
            expect(brand.getProducts()).toEqual([]);
        });
    });

    describe('Test setting data', () => {
        let asset = new Asset('url');
        let product = new Product('air', 'brandId', 'categoryId', '', [], asset);

        let name = 'Nike';
        let description = 'Sport brand';
        let brand = new Brand(name, undefined, undefined, []);

        brand.setDescription(description);
        expect(brand.getDescription()).toEqual(description);

        brand.setAsset(asset);
        expect(brand.getAsset()).toEqual(asset);

        brand.addProduct(product);
        expect(brand.getProducts()).toEqual([product]);

        brand.addProduct(product);
        expect(brand.getProducts()).toEqual([product, product]);
    });

    test('test brand constructor with products', () => {
        let name = 'Nike';
        let product = new Product('air', 'brandId', 'categoryId', '', [], new Asset('url'));
        let brand = new Brand(name, undefined, undefined, [product]);
        expect(brand.getProducts()).toEqual([product]);
    });
});
