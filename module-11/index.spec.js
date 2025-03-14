const createPromise = require('./index');

describe('Базовый Promise', () => {
  vi.useFakeTimers();

  test('Промис резолвится корректно', () => {
    const promise = createPromise();
    vi.advanceTimersByTime(1000);
    return expect(promise).resolves.toBe('Promise resolved!');
  });

  test('Промис реджектится при success = false', () => {
    const promise = createPromise(false);
    vi.advanceTimersByTime(1000);
    return expect(promise).rejects.toThrow('Promise rejected!');
  });
});