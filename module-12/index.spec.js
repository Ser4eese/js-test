const processData = require('./index');

describe('Цепочка промисов', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  afterEach(() => {
    vi.runOnlyPendingTimers();
    // restoring date after each test run
    vi.useRealTimers()
  })
  test('Успешная обработка числа 3', async () => {

    const promise = processData(3); // Запускаем функцию
    vi.advanceTimersByTime(600); // Пропускаем 500 мс (первый setTimeout)
    vi.advanceTimersByTime(300); // Пропускаем еще 300 мс (второй setTimeout)

    const result = await promise; // Ждем завершения промиса
    expect(result).toBe(5); // Проверяем результат

  });

  test('Ошибка при числе 0', async () => {

    const promise = processData(0); // Запускаем функцию
    vi.advanceTimersByTime(600); // Пропускаем 500 мс
    vi.advanceTimersByTime(300); // Пропускаем еще 300 мс

    await expect(promise).rejects.toThrowError('Result must be positive'); // Проверяем ошибку

  });
});