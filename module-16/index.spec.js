import { fetch } from "undici";
describe("Query-параметры", () => {
  beforeAll(() => {
    require("./index.js"); // Запускаем сервер
  });
  test("GET /search?query=test возвращает результаты", async () => {
    const response = await fetch("http://localhost:3002/search?query=test");
    expect(await response.text()).toBe("Search results for: test");
  });
});
