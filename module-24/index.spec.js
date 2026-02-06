const { parseUrl, extractId, createServer, users } = require("./index.js");

describe("Модуль 24: Routing и параметры URL", () => {
  describe("parseUrl", () => {
    test("Парсит pathname без query", () => {
      const result = parseUrl("/api/users");

      expect(result.pathname).toBe("/api/users");
      expect(result.query).toEqual({});
    });

    test("Парсит pathname с query параметрами", () => {
      const result = parseUrl("/api/users?page=2&limit=10");

      expect(result.pathname).toBe("/api/users");
      expect(result.query).toEqual({ page: "2", limit: "10" });
    });

    test("Парсит один query параметр", () => {
      const result = parseUrl("/search?q=hello");

      expect(result.pathname).toBe("/search");
      expect(result.query).toEqual({ q: "hello" });
    });
  });

  describe("extractId", () => {
    test("Извлекает ID из пути", () => {
      expect(extractId("/users/123", "/users/")).toBe(123);
      expect(extractId("/api/posts/456", "/api/posts/")).toBe(456);
    });

    test("Возвращает null для нечислового ID", () => {
      expect(extractId("/users/abc", "/users/")).toBe(null);
      expect(extractId("/users/", "/users/")).toBe(null);
    });

    test("Возвращает null если путь не совпадает с префиксом", () => {
      expect(extractId("/posts/123", "/users/")).toBe(null);
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

    describe("GET /api/users", () => {
      test("Возвращает всех пользователей", async () => {
        const response = await fetch(`${baseUrl}/api/users`);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual(users);
      });

      test("Поддерживает пагинацию", async () => {
        const response = await fetch(`${baseUrl}/api/users?page=1&limit=2`);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toHaveLength(2);
        expect(data[0].id).toBe(1);
        expect(data[1].id).toBe(2);
      });

      test("Вторая страница пагинации", async () => {
        const response = await fetch(`${baseUrl}/api/users?page=2&limit=2`);
        const data = await response.json();

        expect(data).toHaveLength(2);
        expect(data[0].id).toBe(3);
        expect(data[1].id).toBe(4);
      });
    });

    describe("GET /api/users/:id", () => {
      test("Возвращает пользователя по ID", async () => {
        const response = await fetch(`${baseUrl}/api/users/3`);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual({ id: 3, name: "Peter" });
      });

      test("404 для несуществующего пользователя", async () => {
        const response = await fetch(`${baseUrl}/api/users/999`);
        const data = await response.json();

        expect(response.status).toBe(404);
        expect(data).toEqual({ error: "User not found" });
      });
    });

    describe("404 для неизвестных путей", () => {
      test("GET /unknown возвращает 404", async () => {
        const response = await fetch(`${baseUrl}/unknown`);

        expect(response.status).toBe(404);
      });
    });
  });
});
