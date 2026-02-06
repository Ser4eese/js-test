const { sumPositive, getFullName, filterAdults } = require("./index.js");

describe("Модуль 8: Debugging", () => {
  describe("sumPositive", () => {
    test("Суммирует положительные числа", () => {
      expect(sumPositive([1, 2, 3, 4, 5])).toBe(15);
    });

    test("Игнорирует отрицательные числа", () => {
      expect(sumPositive([1, -2, 3, -4, 5])).toBe(9);
    });

    test("Игнорирует ноль (ноль не положительное число)", () => {
      expect(sumPositive([0, 1, 2, 0, 3])).toBe(6);
    });

    test("Возвращает 0 для пустого массива", () => {
      expect(sumPositive([])).toBe(0);
    });

    test("Возвращает 0 если нет положительных", () => {
      expect(sumPositive([-1, -2, 0, -3])).toBe(0);
    });
  });

  describe("getFullName", () => {
    test("Возвращает 'Имя Фамилия'", () => {
      const user = { firstName: "Иван", lastName: "Петров" };
      expect(getFullName(user)).toBe("Иван Петров");
    });

    test("Работает с английскими именами", () => {
      const user = { firstName: "John", lastName: "Doe" };
      expect(getFullName(user)).toBe("John Doe");
    });
  });

  describe("filterAdults", () => {
    test("Возвращает пользователей 18+", () => {
      const users = [
        { name: "Алиса", age: 17 },
        { name: "Боб", age: 18 },
        { name: "Карл", age: 25 },
      ];

      const adults = filterAdults(users);

      expect(adults).toHaveLength(2);
      expect(adults.map((u) => u.name)).toEqual(["Боб", "Карл"]);
    });

    test("Включает пользователей ровно 18 лет", () => {
      const users = [{ name: "Тест", age: 18 }];

      expect(filterAdults(users)).toHaveLength(1);
    });

    test("Возвращает пустой массив если все несовершеннолетние", () => {
      const users = [
        { name: "А", age: 10 },
        { name: "Б", age: 17 },
      ];

      expect(filterAdults(users)).toHaveLength(0);
    });
  });
});
