import { fetch } from "undici";

describe("Простой сервер", () => {
  beforeAll(() => {
    require("./index.js"); // Запускаем сервер
  });

  test("GET / возвращает 'Hello, World!'", async () => {
    const response = await fetch("http://localhost:3000");
    expect(await response.text()).toBe("Hello, World!");
  });
});