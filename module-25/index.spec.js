const { getBody, createServer } = require("./index.js");
const { Readable } = require("stream");

describe("Модуль 25: POST-запросы", () => {
  describe("getBody", () => {
    test("Парсит JSON из запроса", async () => {
      const mockReq = new Readable({ read() {} });

      const bodyPromise = getBody(mockReq);

      mockReq.push('{"name": "Ivan"}');
      mockReq.push(null);

      const result = await bodyPromise;
      expect(result).toEqual({ name: "Ivan" });
    });

    test("Собирает chunks", async () => {
      const mockReq = new Readable({ read() {} });

      const bodyPromise = getBody(mockReq);

      mockReq.push('{"na');
      mockReq.push('me":');
      mockReq.push(' "Test"}');
      mockReq.push(null);

      const result = await bodyPromise;
      expect(result).toEqual({ name: "Test" });
    });

    test("Reject при невалидном JSON", async () => {
      const mockReq = new Readable({ read() {} });

      const bodyPromise = getBody(mockReq);

      mockReq.push("not json");
      mockReq.push(null);

      await expect(bodyPromise).rejects.toThrow();
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

    test("GET /api/users — пустой список изначально", async () => {
      const response = await fetch(`${baseUrl}/api/users`);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });

    test("POST /api/users — создаёт пользователя", async () => {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Ivan" }),
      });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual({ id: 1, name: "Ivan" });
    });

    test("POST /api/users — второй пользователь получает id: 2", async () => {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Maria" }),
      });
      const data = await response.json();

      expect(data).toEqual({ id: 2, name: "Maria" });
    });

    test("GET /api/users — возвращает созданных пользователей", async () => {
      const response = await fetch(`${baseUrl}/api/users`);
      const data = await response.json();

      expect(data).toHaveLength(2);
      expect(data[0].name).toBe("Ivan");
      expect(data[1].name).toBe("Maria");
    });

    test("DELETE /api/users/:id — удаляет пользователя", async () => {
      const response = await fetch(`${baseUrl}/api/users/1`, {
        method: "DELETE",
      });

      expect(response.status).toBe(204);
    });

    test("GET /api/users — после удаления остался один", async () => {
      const response = await fetch(`${baseUrl}/api/users`);
      const data = await response.json();

      expect(data).toHaveLength(1);
      expect(data[0].name).toBe("Maria");
    });

    test("DELETE /api/users/:id — 404 для несуществующего", async () => {
      const response = await fetch(`${baseUrl}/api/users/999`, {
        method: "DELETE",
      });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: "User not found" });
    });

    test("404 для неизвестных путей", async () => {
      const response = await fetch(`${baseUrl}/unknown`);

      expect(response.status).toBe(404);
    });
  });
});
