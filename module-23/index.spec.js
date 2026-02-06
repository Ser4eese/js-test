const { createServer } = require("./index.js");

describe("Модуль 23: HTTP-сервер", () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    server = createServer();
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  describe("GET /", () => {
    test("Возвращает welcome message", async () => {
      const response = await fetch(`${baseUrl}/`);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ message: "Welcome to API" });
    });

    test("Content-Type: application/json", async () => {
      const response = await fetch(`${baseUrl}/`);

      expect(response.headers.get("content-type")).toContain("application/json");
    });
  });

  describe("GET /api/health", () => {
    test("Возвращает статус ok", async () => {
      const response = await fetch(`${baseUrl}/api/health`);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ status: "ok" });
    });
  });

  describe("GET /api/time", () => {
    test("Возвращает текущее время в ISO формате", async () => {
      const before = new Date().toISOString();
      const response = await fetch(`${baseUrl}/api/time`);
      const data = await response.json();
      const after = new Date().toISOString();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("time");
      expect(data.time >= before).toBe(true);
      expect(data.time <= after).toBe(true);
    });
  });

  describe("404 для неизвестных путей", () => {
    test("GET /unknown возвращает 404", async () => {
      const response = await fetch(`${baseUrl}/unknown`);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: "Not found" });
    });

    test("GET /api/unknown возвращает 404", async () => {
      const response = await fetch(`${baseUrl}/api/unknown`);

      expect(response.status).toBe(404);
    });
  });
});
