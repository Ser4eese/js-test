const addNumbers = require('./index');
test('addNumbers works with numbers and non-numbers', () => {
    expect(addNumbers(2, 3)).toBe(5);
    expect(addNumbers('2', 3)).toBe(23);
    expect(addNumbers('hello', 5)).toBeNaN();
});