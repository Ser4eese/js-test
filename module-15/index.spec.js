const { createPromise } = require("./index.js");

describe("Модуль 15: Promises", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("Возвращает Promise", () => {
    const result = createPromise(true, 100);
    expect(result).toBeInstanceOf(Promise);
  });

  test("Resolve происходит через указанную задержку", async () => {
    const promise = createPromise(true, 100);

    vi.advanceTimersByTime(50);
    // Promise ещё не должен разрешиться

    vi.advanceTimersByTime(50);
    const result = await promise;

    expect(result).toBe("Успех");
  });

  test("При shouldResolve=true возвращает 'Успех'", async () => {
    const promise = createPromise(true, 100);
    vi.advanceTimersByTime(100);

    await expect(promise).resolves.toBe("Успех");
  });

  test("При shouldResolve=false возвращает Error с сообщением 'Ошибка'", async () => {
    const promise = createPromise(false, 100);
    vi.advanceTimersByTime(100);

    await expect(promise).rejects.toThrow("Ошибка");
  });

  test("Работает с разными задержками", async () => {
    const promise1 = createPromise(true, 50);
    const promise2 = createPromise(true, 200);

    vi.advanceTimersByTime(50);
    await expect(promise1).resolves.toBe("Успех");

    vi.advanceTimersByTime(150);
    await expect(promise2).resolves.toBe("Успех");
  });
});
