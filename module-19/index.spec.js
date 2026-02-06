const { onClick, onInput, onSubmit } = require("./index.js");

describe("Модуль 19: События", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="btn">Кнопка</button>
      <input id="search" type="text" />
      <form id="form">
        <input name="username" />
        <button type="submit">Отправить</button>
      </form>
    `;
  });

  describe("onClick", () => {
    test("Добавляет обработчик клика", () => {
      const callback = vi.fn();
      onClick("#btn", callback);

      document.querySelector("#btn").click();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test("Callback получает объект события", () => {
      let receivedEvent = null;
      onClick("#btn", (e) => {
        receivedEvent = e;
      });

      document.querySelector("#btn").click();

      expect(receivedEvent).not.toBeNull();
      expect(receivedEvent.type).toBe("click");
      expect(receivedEvent.target.id).toBe("btn");
    });

    test("Возвращает true при успехе", () => {
      const result = onClick("#btn", () => {});
      expect(result).toBe(true);
    });

    test("Возвращает false если элемент не найден", () => {
      const result = onClick("#nonexistent", () => {});
      expect(result).toBe(false);
    });
  });

  describe("onInput", () => {
    test("Добавляет обработчик ввода", () => {
      const callback = vi.fn();
      onInput("#search", callback);

      const input = document.querySelector("#search");
      input.value = "test";
      input.dispatchEvent(new Event("input"));

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test("Callback получает значение поля (value)", () => {
      let receivedValue = null;
      onInput("#search", (value) => {
        receivedValue = value;
      });

      const input = document.querySelector("#search");
      input.value = "hello world";
      input.dispatchEvent(new Event("input"));

      expect(receivedValue).toBe("hello world");
    });

    test("Возвращает true при успехе", () => {
      const result = onInput("#search", () => {});
      expect(result).toBe(true);
    });

    test("Возвращает false если элемент не найден", () => {
      const result = onInput("#unknown", () => {});
      expect(result).toBe(false);
    });
  });

  describe("onSubmit", () => {
    test("Добавляет обработчик отправки", () => {
      const callback = vi.fn();
      onSubmit("#form", callback);

      const form = document.querySelector("#form");
      form.dispatchEvent(new Event("submit"));

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test("Автоматически вызывает preventDefault", () => {
      onSubmit("#form", () => {});

      const form = document.querySelector("#form");
      const event = new Event("submit", { cancelable: true });
      form.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });

    test("Callback получает объект события", () => {
      let receivedEvent = null;
      onSubmit("#form", (e) => {
        receivedEvent = e;
      });

      const form = document.querySelector("#form");
      form.dispatchEvent(new Event("submit"));

      expect(receivedEvent).not.toBeNull();
      expect(receivedEvent.type).toBe("submit");
    });

    test("Возвращает true при успехе", () => {
      const result = onSubmit("#form", () => {});
      expect(result).toBe(true);
    });

    test("Возвращает false если форма не найдена", () => {
      const result = onSubmit("#missing-form", () => {});
      expect(result).toBe(false);
    });
  });
});
