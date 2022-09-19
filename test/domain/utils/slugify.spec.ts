import { slugify } from '../../../src/domain/utils/slugify';

test('make slug from string', () => {
    expect(slugify.convert('men shoes')).toEqual('men-shoes');
});

test('it replace uppercase with lowercase', () => {
    expect(slugify.convert('MEN SHOES')).toEqual('men-shoes');
});

test('it removes special characters', () => {
    expect(slugify.convert('André')).toEqual('andre');
});
