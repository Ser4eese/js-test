const getDoubled = require('./index');

describe('Promise Chain', () => {
  it('getDoubled resolves with 10', () => {
    return getDoubled(5).then(result => {
      expect(result).toBe(10);
    });
  });
});