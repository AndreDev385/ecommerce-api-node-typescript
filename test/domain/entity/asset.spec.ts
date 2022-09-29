import { Asset } from '../../../src/domain/entity/asset';

describe('Test Asset Domain Model', () => {
  const url = 'url'
  const optimizedUrl = 'optimizedUrl'
  test('Test constructor and getters', () => {
    const asset = new Asset(url, optimizedUrl)
    expect(asset.getData().optimizedUrl).toEqual(optimizedUrl);
    expect(asset.getData().originalUrl).toEqual(url);
  })

  test('Validations', () => {
    const number: any = 123
    expect(() => new Asset(number)).toThrow(Error('Url should be a string'));
    expect(() => new Asset(url, number)).toThrow(Error('Url should be a string'));
  })

  test('setters', () => {
    const asset = new Asset(url)
    const newUrl = 'asdfasdf'

    asset.setOriginalUrl(newUrl);
    expect(asset.getData().originalUrl).toEqual(newUrl);

    expect(asset.getData().optimizedUrl).toBeNull();

    asset.setOptimizedUrl(optimizedUrl);
    expect(asset.getData().optimizedUrl).toEqual(optimizedUrl);
  })
});
