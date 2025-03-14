const findInArray = require('./index');
test('findInArray checks presence of value', () => {
    expect(findInArray([1, 2, 3], 2)).toBe(true);
    expect(findInArray(['a', 'b'], 'c')).toBe(false);
});