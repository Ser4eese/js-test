const greet = require('./index');
test('greet returns correct string', () => {
    expect(greet('John')).toBe('Hello, John!');
    expect(greet('')).toBe('Hello, !');
});