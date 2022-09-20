import { Asset } from '../../../src/domain/entity/asset';

describe('Test Asset Domain Model', () => {
    let url = 'url';
    let optimizedUrl = 'optimizedUrl';
    test('Test constructor and getters', () => {
        let asset = new Asset(url, optimizedUrl);
        expect(asset.getOriginalUrl()).toEqual(url);
        expect(asset.getOptimizedUrl()).toEqual(optimizedUrl);
    });

    test('Validations', () => {
        let number: any = 123;
        expect(() => new Asset(number)).toThrow(Error('Url should be a string'));
        expect(() => new Asset(url, number)).toThrow(Error('Url should be a string'));
    });

    test('setters', () => {
        let asset = new Asset(url);
        let newUrl = 'asdfasdf';

        asset.setOriginalUrl(newUrl);
        expect(asset.getOriginalUrl()).toEqual(newUrl);

        asset.setOptimizedUrl(optimizedUrl);
        expect(asset.getOptimizedUrl()).toEqual(optimizedUrl);
    });
});
