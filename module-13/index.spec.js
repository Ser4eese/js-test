const fetchUserData = require('./index');

describe('Async/Await', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: 'John' }),
      })
    );
  });

  test('Успешный запрос', async () => {
    const user = await fetchUserData();
    expect(user).toEqual({ id: 1, name: 'John' });
  });

  test('Обработка ошибки', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 404 })
    );
    await expect(fetchUserData()).rejects.toThrow('HTTP error 404');
  });
});