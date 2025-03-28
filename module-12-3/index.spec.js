const getBoth = require('./index');


describe('Parallel Promises', () => {
  it('getBoth resolves with [1, 2]', () => {
    return getBoth().then(result => {
      expect(result).toEqual([1, 2]);
    });
  });
});