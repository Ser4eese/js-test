const fs = require("fs");
const path = require("path");
const { createStore } = require("./store.js");
const { createApp } = require("./server.js");

describe("Модуль 32: Финальный проект — Backend", () => {
  // ─── Store ───

  describe("Store", () => {
    const testFile = path.join(__dirname, "test-store.json");

    beforeEach(() => {
      if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    });

    afterAll(() => {
      if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    });

    test("Создаёт store с пустыми данными", () => {
      const store = createStore(testFile);
      expect(store.getAll()).toEqual([]);
    });

    test("add — добавляет запись с id", () => {
      const store = createStore(testFile);
      const note = store.add({ title: "Test", text: "Content" });

      expect(note.id).toBe(1);
      expect(note.title).toBe("Test");
      expect(note.text).toBe("Content");
    });

    test("add — сохраняет в файл", () => {
      const store = createStore(testFile);
      store.add({ title: "Saved", text: "Data" });

      const raw = JSON.parse(fs.readFileSync(testFile, "utf-8"));
      expect(raw).toHaveLength(1);
    });

    test("update — обновляет запись", () => {
      const store = createStore(testFile);
      store.add({ title: "Old", text: "Old text" });
      const updated = store.update(1, { title: "New" });

      expect(updated.title).toBe("New");
      expect(updated.text).toBe("Old text");
    });

    test("remove — удаляет запись", () => {
      const store = createStore(testFile);
      store.add({ title: "A", text: "1" });
      store.add({ title: "B", text: "2" });

      expect(store.remove(1)).toBe(true);
      expect(store.getAll()).toHaveLength(1);
    });

    test("Персистентность", () => {
      const store1 = createStore(testFile);
      store1.add({ title: "Persist", text: "Data" });

      const store2 = createStore(testFile);
      expect(store2.getAll()).toHaveLength(1);
    });
  });

  // ─── API ───

  describe("API сервера", () => {
    const testFile = path.join(__dirname, "test-api.json");
    let server;
    let baseUrl;

    beforeAll(async () => {
      if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
      const store = createStore(testFile);
      const app = createApp(store);
      await new Promise((resolve) => {
        server = app.listen(0, () => {
          baseUrl = `http://localhost:${server.address().port}`;
          resolve();
        });
      });
    });

    afterAll(async () => {
      await new Promise((resolve) => {
        server.close(() => {
          if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
          resolve();
        });
      });
    });

    test("GET /api/notes — пустой список", async () => {
      const res = await fetch(`${baseUrl}/api/notes`);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual([]);
    });

    test("POST /api/notes — создаёт заметку", async () => {
      const res = await fetch(`${baseUrl}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Note 1", text: "Content 1" }),
      });
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data.id).toBe(1);
      expect(data.title).toBe("Note 1");
      expect(data.text).toBe("Content 1");
      expect(data.createdAt).toBeDefined();
    });

    test("POST — вторая заметка", async () => {
      const res = await fetch(`${baseUrl}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Note 2", text: "Content 2" }),
      });
      const data = await res.json();

      expect(data.id).toBe(2);
    });

    test("GET — возвращает обе заметки", async () => {
      const res = await fetch(`${baseUrl}/api/notes`);
      const data = await res.json();

      expect(data).toHaveLength(2);
    });

    test("PATCH /api/notes/:id — обновляет", async () => {
      const res = await fetch(`${baseUrl}/api/notes/1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Updated" }),
      });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.title).toBe("Updated");
      expect(data.text).toBe("Content 1");
    });

    test("PATCH /api/notes/999 — 404", async () => {
      const res = await fetch(`${baseUrl}/api/notes/999`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "X" }),
      });

      expect(res.status).toBe(404);
    });

    test("DELETE /api/notes/:id — удаляет", async () => {
      const res = await fetch(`${baseUrl}/api/notes/1`, {
        method: "DELETE",
      });

      expect(res.status).toBe(204);
    });

    test("DELETE /api/notes/999 — 404", async () => {
      const res = await fetch(`${baseUrl}/api/notes/999`, {
        method: "DELETE",
      });

      expect(res.status).toBe(404);
    });

    test("CORS — заголовки", async () => {
      const res = await fetch(`${baseUrl}/api/notes`);
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    test("OPTIONS — preflight", async () => {
      const res = await fetch(`${baseUrl}/api/notes`, { method: "OPTIONS" });
      expect(res.status).toBe(204);
    });
  });
});
