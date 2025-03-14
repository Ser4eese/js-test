const isEven = require('./index');
test('isEven checks even/odd correctly', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(7)).toBe(false);
    expect(isEven(0)).toBe(true);
});