const maybeFail = require('./index');

describe('Error Handling', () => {
  it('catchError resolves with "Ыыыы"', () => {
    return maybeFail().catch(result => {
      expect(result).toBe('Ыыыы');
    });
  });
});