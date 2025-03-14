const sumWithLoop = require('./index');
test('sumWithLoop calculates sum with loop', () => {
    expect(sumWithLoop([1, 2, 3])).toBe(6);
    expect(sumWithLoop([])).toBe(0);
    expect(sumWithLoop([-1, 5])).toBe(4);
});