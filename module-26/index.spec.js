const { addCorsHeaders, handlePreflight, createServer } = require("./index.js");

describe("Модуль 26: CORS", () => {
  describe("addCorsHeaders", () => {
    test("Добавляет Access-Control-Allow-Origin", () => {
      const res = { setHeader: vi.fn() };

      addCorsHeaders(res);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        "*"
      );
    });

    test("Добавляет Access-Control-Allow-Methods", () => {
      const res = { setHeader: vi.fn() };

      addCorsHeaders(res);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Methods",
        expect.stringContaining("GET")
      );
      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Methods",
        expect.stringContaining("POST")
      );
    });

    test("Добавляет Access-Control-Allow-Headers", () => {
      const res = { setHeader: vi.fn() };

      addCorsHeaders(res);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Headers",
        expect.stringContaining("Content-Type")
      );
    });
  });

  describe("handlePreflight", () => {
    test("Возвращает true и обрабатывает OPTIONS", () => {
      const req = { method: "OPTIONS" };
      const res = {
        setHeader: vi.fn(),
        end: vi.fn(),
        statusCode: 200,
      };

      const result = handlePreflight(req, res);

      expect(result).toBe(true);
      expect(res.statusCode).toBe(204);
      expect(res.end).toHaveBeenCalled();
    });

    test("Возвращает false для других методов", () => {
      const req = { method: "GET" };
      const res = { setHeader: vi.fn(), end: vi.fn() };

      const result = handlePreflight(req, res);

      expect(result).toBe(false);
      expect(res.end).not.toHaveBeenCalled();
    });
  });

  describe("createServer", () => {
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

    test("OPTIONS возвращает 204 с CORS-заголовками", async () => {
      const response = await fetch(`${baseUrl}/api/message`, {
        method: "OPTIONS",
      });

      expect(response.status).toBe(204);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    test("GET /api/message возвращает сообщение", async () => {
      const response = await fetch(`${baseUrl}/api/message`);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ message: "Hello from API" });
    });

    test("GET /api/message содержит CORS-заголовки", async () => {
      const response = await fetch(`${baseUrl}/api/message`);

      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    test("POST /api/echo возвращает полученный body", async () => {
      const response = await fetch(`${baseUrl}/api/echo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "test", number: 42 }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: "test", number: 42 });
    });

    test("404 для неизвестных путей", async () => {
      const response = await fetch(`${baseUrl}/unknown`);

      expect(response.status).toBe(404);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });
  });
});
