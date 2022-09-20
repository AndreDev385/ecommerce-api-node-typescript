import { v4 } from 'uuid';
import { Asset } from '../../../src/domain/entity/asset';
import { Variation } from '../../../src/domain/entity/variation';

describe('Test Variation Domain Model', () => {
    let productId = v4();
    let price = 12.99;
    let oPrice = 0.99;
    let asset = new Asset('url');
    let attributes = [
        { name: 'color', value: 'black-white' },
        { name: 'size', value: '38' },
    ];
    let stock = 10;

    describe('Test validations', () => {
        let string: any = '123';
        let negative = -12.9;

        test('Test Price and offerPrice validations', () => {
            expect(() => new Variation(productId, string, attributes, stock, [asset])).toThrow(
                Error('Price should be a number')
            );

            expect(
                () => new Variation(productId, price, attributes, stock, [asset], string)
            ).toThrow(Error('Price should be a number'));

            expect(() => new Variation(productId, negative, attributes, stock, [asset])).toThrow(
                Error('Price should be greater than zero')
            );

            expect(
                () => new Variation(productId, price, attributes, stock, [asset], negative)
            ).toThrow(Error('Price should be greater than zero'));
        });

        test('Test productId Validations', () => {
            expect(() => new Variation(123 as any, price, attributes, stock, [asset])).toThrow(
                Error('productId should be a string')
            );
        });

        test('Test Empty attributes array', () => {
            expect(() => new Variation(productId, price, [], stock, [asset])).toThrow(
                Error('Insert some attributes')
            );
        });

        test('Test stock validations', () => {
            expect(() => new Variation(productId, price, attributes, -1, [asset])).toThrow(
                Error('Stock should be positive')
            );

            expect(() => new Variation(productId, price, attributes, string, [asset])).toThrow(
                Error('Stock should be a number')
            );
        });
    });

    test('Test constructor and getters', () => {
        let newPrice = 4.99;
        let newStock = 2;
        let newAttributes = [
            { name: 'color', value: 'green' },
            { name: 'size', value: '12' },
        ];
        let newAsset = new Asset('url');
        let variation = new Variation(productId, price, attributes, stock, [asset]);

        variation.setPrice(newPrice);
        expect(variation.getPrice()).toEqual(newPrice);

        variation.setAttributes(newAttributes);
        expect(variation.getAttributes()).toEqual(newAttributes);

        variation.setStock(newStock);
        expect(variation.getStock()).toEqual(newStock);

        variation.addAsset(newAsset);
        expect(variation.getAssets()).toEqual([asset, newAsset]);

        expect(variation.getOfferPrice()).toBeNull();
        variation.setOfferPrice(price);
        expect(variation.getOfferPrice()).toEqual(price);

        expect(variation.getIsAvaible()).toBeTruthy();
        variation.setStock(0);
        expect(variation.getIsAvaible()).toBeFalsy;

        let variation2 = new Variation(productId, price, attributes, 0, [asset]);
        expect(variation2.getIsAvaible()).toBeFalsy();
    });
});
