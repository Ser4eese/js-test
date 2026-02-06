const fs = require("fs");
const path = require("path");
const { createStore } = require("./index.js");

describe("Модуль 28: Работа с файлами", () => {
  const testFile = path.join(__dirname, "test-data.json");

  beforeEach(() => {
    // Удаляем тестовый файл перед каждым тестом
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterAll(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  describe("createStore", () => {
    test("Создаёт store с пустыми данными", () => {
      const store = createStore(testFile);
      expect(store.getAll()).toEqual([]);
    });

    test("Загружает данные из существующего файла", () => {
      fs.writeFileSync(
        testFile,
        JSON.stringify([{ id: 1, title: "Existing" }])
      );

      const store = createStore(testFile);
      expect(store.getAll()).toEqual([{ id: 1, title: "Existing" }]);
    });
  });

  describe("add", () => {
    test("Добавляет запись с автоинкрементом id", () => {
      const store = createStore(testFile);

      const item1 = store.add({ title: "First" });
      const item2 = store.add({ title: "Second" });

      expect(item1).toEqual({ id: 1, title: "First" });
      expect(item2).toEqual({ id: 2, title: "Second" });
    });

    test("Сохраняет в файл после добавления", () => {
      const store = createStore(testFile);
      store.add({ title: "Saved" });

      const raw = fs.readFileSync(testFile, "utf-8");
      const data = JSON.parse(raw);

      expect(data).toHaveLength(1);
      expect(data[0].title).toBe("Saved");
    });

    test("Продолжает нумерацию после загрузки из файла", () => {
      fs.writeFileSync(
        testFile,
        JSON.stringify([{ id: 5, title: "Old" }])
      );

      const store = createStore(testFile);
      const newItem = store.add({ title: "New" });

      expect(newItem.id).toBe(6);
    });
  });

  describe("getById", () => {
    test("Находит запись по id", () => {
      const store = createStore(testFile);
      store.add({ title: "Find me" });

      expect(store.getById(1)).toEqual({ id: 1, title: "Find me" });
    });

    test("Возвращает null если не найдена", () => {
      const store = createStore(testFile);

      expect(store.getById(999)).toBeNull();
    });
  });

  describe("update", () => {
    test("Обновляет запись по id", () => {
      const store = createStore(testFile);
      store.add({ title: "Original", completed: false });

      const updated = store.update(1, { completed: true });

      expect(updated).toEqual({
        id: 1,
        title: "Original",
        completed: true,
      });
    });

    test("Сохраняет изменения в файл", () => {
      const store = createStore(testFile);
      store.add({ title: "Test" });
      store.update(1, { title: "Updated" });

      const raw = fs.readFileSync(testFile, "utf-8");
      const data = JSON.parse(raw);

      expect(data[0].title).toBe("Updated");
    });

    test("Возвращает null для несуществующей записи", () => {
      const store = createStore(testFile);

      expect(store.update(999, { title: "Nope" })).toBeNull();
    });
  });

  describe("remove", () => {
    test("Удаляет запись и возвращает true", () => {
      const store = createStore(testFile);
      store.add({ title: "Delete me" });

      expect(store.remove(1)).toBe(true);
      expect(store.getAll()).toHaveLength(0);
    });

    test("Возвращает false если запись не найдена", () => {
      const store = createStore(testFile);

      expect(store.remove(999)).toBe(false);
    });

    test("Сохраняет удаление в файл", () => {
      const store = createStore(testFile);
      store.add({ title: "A" });
      store.add({ title: "B" });
      store.remove(1);

      const raw = fs.readFileSync(testFile, "utf-8");
      const data = JSON.parse(raw);

      expect(data).toHaveLength(1);
      expect(data[0].title).toBe("B");
    });
  });

  describe("Персистентность", () => {
    test("Данные сохраняются между инстансами store", () => {
      const store1 = createStore(testFile);
      store1.add({ title: "Persistent" });

      // Создаём новый store из того же файла
      const store2 = createStore(testFile);
      expect(store2.getAll()).toHaveLength(1);
      expect(store2.getAll()[0].title).toBe("Persistent");
    });
  });
});
