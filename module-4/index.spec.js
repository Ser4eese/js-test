const createUser = require('./index');
test('createUser builds correct object', () => {
    expect(createUser('Alice', 25)).toEqual({ name: 'Alice', age: 25 });
    expect(createUser('Bob', 30).age).toBe(30);
});