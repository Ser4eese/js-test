const mergeObjects = require('./index');
test('mergeObjects combines objects', () => {
    expect(mergeObjects({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    expect(mergeObjects({ a: 1 }, { a: 5 })).toEqual({ a: 5 });
});