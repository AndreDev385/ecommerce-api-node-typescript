import { v4 as uuid } from 'uuid';

import { Asset } from '../../../src/domain/entity/asset';

describe('Test Asset Domain Model', () => {
    let id = uuid();
    let url = 'url';
    let optimizedUrl = 'optimizedUrl';
    test('Test constructor and getters', () => {
        let asset = new Asset(url, id, optimizedUrl);
        expect(asset.getId()).toEqual(id);
        expect(asset.getOriginalUrl()).toEqual(url);
        expect(asset.getOptimizedUrl()).toEqual(optimizedUrl);
    });

    test('Validations', () => {
        let number: any = 123;
        expect(() => new Asset(number, id)).toThrow(Error('Url should be a string'));
        expect(() => new Asset(url, id, number)).toThrow(Error('Url should be a string'));
    });

    test('setters', () => {
        let asset = new Asset(url);
        let newUrl = 'asdfasdf';
        expect(asset.getId()).toBeUndefined();

        asset.setId(id);
        expect(asset.getId()).toEqual(id);

        asset.setOriginalUrl(newUrl);
        expect(asset.getOriginalUrl()).toEqual(newUrl);

        asset.setOptimizedUrl(optimizedUrl);
        expect(asset.getOptimizedUrl()).toEqual(optimizedUrl);
    });
});
