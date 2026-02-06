const { fetchSequential } = require("./index.js");

describe("Модуль 16: async/await", () => {
  test("Возвращает Promise", () => {
    const result = fetchSequential([]);
    expect(result).toBeInstanceOf(Promise);
  });

  test("Возвращает пустой массив для пустого входа", async () => {
    const results = await fetchSequential([]);
    expect(results).toEqual([]);
  });

  test("Выполняет задачи и собирает результаты", async () => {
    const task1 = () => Promise.resolve(1);
    const task2 = () => Promise.resolve(2);
    const task3 = () => Promise.resolve(3);

    const results = await fetchSequential([task1, task2, task3]);

    expect(results).toEqual([1, 2, 3]);
  });

  test("Выполняет задачи последовательно", async () => {
    const order = [];

    const task1 = async () => {
      order.push("start1");
      await Promise.resolve();
      order.push("end1");
      return 1;
    };

    const task2 = async () => {
      order.push("start2");
      await Promise.resolve();
      order.push("end2");
      return 2;
    };

    await fetchSequential([task1, task2]);

    // Если последовательно: start1, end1, start2, end2
    expect(order).toEqual(["start1", "end1", "start2", "end2"]);
  });

  test("Пробрасывает ошибку при reject", async () => {
    const task1 = () => Promise.resolve(1);
    const failing = () => Promise.reject(new Error("Тестовая ошибка"));
    const task3 = () => Promise.resolve(3);

    await expect(fetchSequential([task1, failing, task3])).rejects.toThrow(
      "Тестовая ошибка"
    );
  });

  test("Работает с разными типами результатов", async () => {
    const tasks = [
      () => Promise.resolve("строка"),
      () => Promise.resolve(42),
      () => Promise.resolve({ key: "value" }),
      () => Promise.resolve([1, 2, 3]),
    ];

    const results = await fetchSequential(tasks);

    expect(results).toEqual(["строка", 42, { key: "value" }, [1, 2, 3]]);
  });
});
