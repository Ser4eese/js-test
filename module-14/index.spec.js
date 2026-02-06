const { executeInOrder } = require("./index.js");

describe("Модуль 14: Event Loop и setTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("Выполняет первую функцию сразу (0 мс)", () => {
    const first = vi.fn();
    const second = vi.fn();
    const third = vi.fn();

    executeInOrder(first, second, third);

    vi.advanceTimersByTime(0);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
    expect(third).not.toHaveBeenCalled();
  });

  test("Выполняет вторую функцию через 100 мс", () => {
    const first = vi.fn();
    const second = vi.fn();
    const third = vi.fn();

    executeInOrder(first, second, third);

    vi.advanceTimersByTime(100);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
    expect(third).not.toHaveBeenCalled();
  });

  test("Выполняет третью функцию через 200 мс", () => {
    const first = vi.fn();
    const second = vi.fn();
    const third = vi.fn();

    executeInOrder(first, second, third);

    vi.advanceTimersByTime(200);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
    expect(third).toHaveBeenCalledTimes(1);
  });

  test("Возвращает объект с методом cancel()", () => {
    const first = vi.fn();
    const second = vi.fn();
    const third = vi.fn();

    const task = executeInOrder(first, second, third);

    expect(task).toHaveProperty("cancel");
    expect(typeof task.cancel).toBe("function");
  });

  test("cancel() отменяет невыполненные таймеры", () => {
    const first = vi.fn();
    const second = vi.fn();
    const third = vi.fn();

    const task = executeInOrder(first, second, third);

    vi.advanceTimersByTime(50);
    task.cancel();

    vi.advanceTimersByTime(200);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
    expect(third).not.toHaveBeenCalled();
  });
});
