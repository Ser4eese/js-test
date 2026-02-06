const { createServer } = require("./server.js");
const {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  renderTodos,
} = require("./app.js");

describe("Модуль 27: TODO-приложение", () => {
  // ─── Backend ───

  describe("Backend: API сервера", () => {
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

    test("GET /api/todos — пустой список изначально", async () => {
      const res = await fetch(`${baseUrl}/api/todos`);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual([]);
    });

    test("POST /api/todos — создаёт задачу", async () => {
      const res = await fetch(`${baseUrl}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Купить молоко" }),
      });
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data).toEqual({
        id: 1,
        title: "Купить молоко",
        completed: false,
      });
    });

    test("POST /api/todos — вторая задача", async () => {
      const res = await fetch(`${baseUrl}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Выгулять собаку" }),
      });
      const data = await res.json();

      expect(data.id).toBe(2);
      expect(data.title).toBe("Выгулять собаку");
      expect(data.completed).toBe(false);
    });

    test("GET /api/todos — возвращает обе задачи", async () => {
      const res = await fetch(`${baseUrl}/api/todos`);
      const data = await res.json();

      expect(data).toHaveLength(2);
    });

    test("PATCH /api/todos/:id — переключает completed", async () => {
      const res = await fetch(`${baseUrl}/api/todos/1`, {
        method: "PATCH",
      });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.completed).toBe(true);
    });

    test("PATCH повторно — переключает обратно", async () => {
      const res = await fetch(`${baseUrl}/api/todos/1`, {
        method: "PATCH",
      });
      const data = await res.json();

      expect(data.completed).toBe(false);
    });

    test("PATCH /api/todos/999 — 404 для несуществующей", async () => {
      const res = await fetch(`${baseUrl}/api/todos/999`, {
        method: "PATCH",
      });

      expect(res.status).toBe(404);
    });

    test("DELETE /api/todos/:id — удаляет задачу", async () => {
      const res = await fetch(`${baseUrl}/api/todos/1`, {
        method: "DELETE",
      });

      expect(res.status).toBe(204);
    });

    test("GET после DELETE — осталась одна задача", async () => {
      const res = await fetch(`${baseUrl}/api/todos`);
      const data = await res.json();

      expect(data).toHaveLength(1);
      expect(data[0].id).toBe(2);
    });

    test("DELETE /api/todos/999 — 404 для несуществующей", async () => {
      const res = await fetch(`${baseUrl}/api/todos/999`, {
        method: "DELETE",
      });

      expect(res.status).toBe(404);
    });

    test("CORS — заголовки присутствуют", async () => {
      const res = await fetch(`${baseUrl}/api/todos`);

      expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    test("OPTIONS — preflight возвращает 204", async () => {
      const res = await fetch(`${baseUrl}/api/todos`, {
        method: "OPTIONS",
      });

      expect(res.status).toBe(204);
    });
  });

  // ─── Frontend ───

  describe("Frontend: API-функции", () => {
    const mockFetch = vi.fn();
    const originalFetch = global.fetch;

    beforeAll(() => {
      global.fetch = mockFetch;
    });

    afterAll(() => {
      global.fetch = originalFetch;
    });

    beforeEach(() => {
      mockFetch.mockReset();
    });

    test("fetchTodos — GET /api/todos", async () => {
      const todos = [{ id: 1, title: "Test", completed: false }];
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(todos),
      });

      const result = await fetchTodos("http://localhost:3000");

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/todos"
      );
      expect(result).toEqual(todos);
    });

    test("addTodo — POST /api/todos", async () => {
      const todo = { id: 1, title: "New", completed: false };
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(todo),
      });

      const result = await addTodo("http://localhost:3000", "New");

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/todos",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ title: "New" }),
        })
      );
      expect(result).toEqual(todo);
    });

    test("toggleTodo — PATCH /api/todos/:id", async () => {
      const todo = { id: 1, title: "Test", completed: true };
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(todo),
      });

      const result = await toggleTodo("http://localhost:3000", 1);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/todos/1",
        expect.objectContaining({ method: "PATCH" })
      );
      expect(result).toEqual(todo);
    });

    test("deleteTodo — DELETE /api/todos/:id", async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const result = await deleteTodo("http://localhost:3000", 5);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/todos/5",
        expect.objectContaining({ method: "DELETE" })
      );
      expect(result).toBe(true);
    });
  });

  describe("Frontend: renderTodos", () => {
    let container;

    beforeEach(() => {
      document.body.innerHTML = '<ul id="list"></ul>';
      container = document.getElementById("list");
    });

    test("Рендерит пустой список", () => {
      renderTodos([], container);

      expect(container.children).toHaveLength(0);
    });

    test("Рендерит задачи как <li>", () => {
      renderTodos(
        [
          { id: 1, title: "Task 1", completed: false },
          { id: 2, title: "Task 2", completed: false },
        ],
        container
      );

      expect(container.children).toHaveLength(2);
      expect(container.children[0].tagName).toBe("LI");
    });

    test("Текст задачи в span.todo-title", () => {
      renderTodos(
        [{ id: 1, title: "Buy milk", completed: false }],
        container
      );

      const span = container.querySelector(".todo-title");
      expect(span).not.toBeNull();
      expect(span.textContent).toBe("Buy milk");
    });

    test("Кнопка удаления button.delete-btn", () => {
      renderTodos(
        [{ id: 1, title: "Task", completed: false }],
        container
      );

      const btn = container.querySelector(".delete-btn");
      expect(btn).not.toBeNull();
      expect(btn.textContent).toBe("×");
    });

    test("Completed задача имеет класс completed", () => {
      renderTodos(
        [{ id: 1, title: "Done task", completed: true }],
        container
      );

      const li = container.children[0];
      expect(li.classList.contains("completed")).toBe(true);
    });

    test("Незавершённая задача НЕ имеет класс completed", () => {
      renderTodos(
        [{ id: 1, title: "Open task", completed: false }],
        container
      );

      const li = container.children[0];
      expect(li.classList.contains("completed")).toBe(false);
    });

    test("Очищает контейнер перед рендером", () => {
      renderTodos(
        [{ id: 1, title: "First", completed: false }],
        container
      );
      renderTodos(
        [{ id: 2, title: "Second", completed: false }],
        container
      );

      expect(container.children).toHaveLength(1);
      expect(container.querySelector(".todo-title").textContent).toBe(
        "Second"
      );
    });
  });
});
