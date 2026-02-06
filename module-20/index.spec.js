const { getFormData, validateForm } = require("./index.js");

describe("Модуль 20: Формы и валидация", () => {
  describe("getFormData", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <form id="register">
          <input name="username" value="ivan">
          <input name="email" value="ivan@mail.ru">
          <input name="password" value="secret123">
        </form>
      `;
    });

    test("Возвращает объект с данными формы", () => {
      const data = getFormData("#register");

      expect(data).toEqual({
        username: "ivan",
        email: "ivan@mail.ru",
        password: "secret123",
      });
    });

    test("Работает с пустыми полями", () => {
      document.body.innerHTML = `
        <form id="empty">
          <input name="field1" value="">
          <input name="field2" value="">
        </form>
      `;

      const data = getFormData("#empty");

      expect(data).toEqual({
        field1: "",
        field2: "",
      });
    });

    test("Возвращает null если форма не найдена", () => {
      expect(getFormData("#nonexistent")).toBeNull();
    });
  });

  describe("validateForm", () => {
    test("Возвращает isValid: true для валидных данных", () => {
      const result = validateForm({
        username: "ivan",
        email: "ivan@mail.ru",
        password: "12345678",
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    test("Проверяет username (минимум 3 символа)", () => {
      const result = validateForm({
        username: "iv",
        email: "ivan@mail.ru",
        password: "12345678",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.username).toBe("Минимум 3 символа");
    });

    test("Проверяет email (содержит @ и .)", () => {
      const result1 = validateForm({
        username: "ivan",
        email: "invalid",
        password: "12345678",
      });

      expect(result1.isValid).toBe(false);
      expect(result1.errors.email).toBe("Некорректный email");

      const result2 = validateForm({
        username: "ivan",
        email: "test@nodot",
        password: "12345678",
      });

      expect(result2.isValid).toBe(false);
      expect(result2.errors.email).toBe("Некорректный email");
    });

    test("Проверяет password (минимум 8 символов)", () => {
      const result = validateForm({
        username: "ivan",
        email: "ivan@mail.ru",
        password: "1234567",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe("Минимум 8 символов");
    });

    test("Возвращает несколько ошибок одновременно", () => {
      const result = validateForm({
        username: "iv",
        email: "bad",
        password: "123",
      });

      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors)).toHaveLength(3);
      expect(result.errors.username).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.password).toBeDefined();
    });

    test("Проверяет пустые значения", () => {
      const result = validateForm({
        username: "",
        email: "",
        password: "",
      });

      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors)).toHaveLength(3);
    });
  });
});
