const { asyncOperation } = require("./index.js");

describe("Модуль 13: Callbacks", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("Вызывает callback через 100мс", () => {
    const callback = vi.fn();

    asyncOperation(true, callback);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("При успехе передаёт null и результат", () => {
    const callback = vi.fn();

    asyncOperation(true, callback);
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith(null, "Операция успешна");
  });

  test("При ошибке передаёт Error и null", () => {
    const callback = vi.fn();

    asyncOperation(false, callback);
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);

    const [error, result] = callback.mock.calls[0];
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Операция не удалась");
    expect(result).toBeNull();
  });

  test("Работает с разными значениями shouldSucceed", () => {
    const successCallback = vi.fn();
    const errorCallback = vi.fn();

    asyncOperation(true, successCallback);
    asyncOperation(false, errorCallback);

    vi.advanceTimersByTime(100);

    expect(successCallback).toHaveBeenCalledWith(null, "Операция успешна");

    const [error] = errorCallback.mock.calls[0];
    expect(error).toBeInstanceOf(Error);
  });
});
