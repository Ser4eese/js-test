const { createApp } = require("./index.js");

describe("Модуль 29: Express", () => {
  let app;
  let server;
  let baseUrl;

  beforeAll(async () => {
    app = createApp();
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test("GET /api/todos — пустой список", async () => {
    const res = await fetch(`${baseUrl}/api/todos`);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual([]);
  });

  test("POST /api/todos — создаёт задачу", async () => {
    const res = await fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Learn Express" }),
    });
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual({
      id: 1,
      title: "Learn Express",
      completed: false,
    });
  });

  test("POST — вторая задача", async () => {
    const res = await fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Build API" }),
    });
    const data = await res.json();

    expect(data.id).toBe(2);
  });

  test("GET /api/todos — возвращает обе задачи", async () => {
    const res = await fetch(`${baseUrl}/api/todos`);
    const data = await res.json();

    expect(data).toHaveLength(2);
  });

  test("GET /api/todos/:id — задача по id", async () => {
    const res = await fetch(`${baseUrl}/api/todos/1`);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.title).toBe("Learn Express");
  });

  test("GET /api/todos/:id — 404 для несуществующей", async () => {
    const res = await fetch(`${baseUrl}/api/todos/999`);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data).toEqual({ error: "Todo not found" });
  });

  test("PATCH /api/todos/:id — toggle completed", async () => {
    const res = await fetch(`${baseUrl}/api/todos/1`, {
      method: "PATCH",
    });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.completed).toBe(true);
  });

  test("PATCH повторно — toggle обратно", async () => {
    const res = await fetch(`${baseUrl}/api/todos/1`, {
      method: "PATCH",
    });
    const data = await res.json();

    expect(data.completed).toBe(false);
  });

  test("PATCH /api/todos/999 — 404", async () => {
    const res = await fetch(`${baseUrl}/api/todos/999`, {
      method: "PATCH",
    });

    expect(res.status).toBe(404);
  });

  test("DELETE /api/todos/:id — удаляет", async () => {
    const res = await fetch(`${baseUrl}/api/todos/1`, {
      method: "DELETE",
    });

    expect(res.status).toBe(204);
  });

  test("DELETE /api/todos/999 — 404", async () => {
    const res = await fetch(`${baseUrl}/api/todos/999`, {
      method: "DELETE",
    });

    expect(res.status).toBe(404);
  });

  test("GET после DELETE — осталась одна задача", async () => {
    const res = await fetch(`${baseUrl}/api/todos`);
    const data = await res.json();

    expect(data).toHaveLength(1);
    expect(data[0].id).toBe(2);
  });

  test("CORS — заголовки присутствуют", async () => {
    const res = await fetch(`${baseUrl}/api/todos`);

    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  test("OPTIONS — preflight 204", async () => {
    const res = await fetch(`${baseUrl}/api/todos`, {
      method: "OPTIONS",
    });

    expect(res.status).toBe(204);
  });
});
