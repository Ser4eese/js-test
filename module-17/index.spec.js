import './index';

describe('Сервер', () => {
  test('OPTIONS / возвращает 204', async () => {
    const response = await fetch('http://localhost:3003', {
      method: 'OPTIONS',
    });
    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).not.toEqual(null);
    expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type');
  });
  test('POST /register создает пользователя', async () => {
    const response = await fetch('http://localhost:3003/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: 'test', password: '123' }),
    });
    expect(response.status).toBe(201);
  });

  test('GET /users возвращает список пользователей', async () => {
    const response = await fetch('http://localhost:3003/users');
    const users = await response.json();
    expect(users).toEqual(expect.arrayContaining([
      expect.objectContaining({ login: 'test' }),
    ]));
  });
});