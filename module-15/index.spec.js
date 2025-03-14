import { fetch } from "undici";
describe("Маршрутизация", () => {
  beforeAll(() => {
    require("./index.js"); // Запускаем сервер
  });
  test("GET /about возвращает 'About Page'", async () => {
    const response = await fetch("http://localhost:3001/about");
    expect(await response.text()).toBe("About Page");
  });

  test("Несуществующий путь → 404", async () => {
    const response = await fetch("http://localhost:3001/unknown");
    expect(response.status).toBe(404);
  });
});
