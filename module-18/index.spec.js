const { getElementText, setElementText, toggleClass } = require("./index.js");

describe("Модуль 18: DOM", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1 id="title">Заголовок</h1>
      <p class="text">Параграф текста</p>
      <div class="box">Контент</div>
      <button class="btn active">Кнопка</button>
    `;
  });

  describe("getElementText", () => {
    test("Возвращает текст элемента по id", () => {
      expect(getElementText("#title")).toBe("Заголовок");
    });

    test("Возвращает текст элемента по классу", () => {
      expect(getElementText(".text")).toBe("Параграф текста");
    });

    test("Возвращает текст элемента по тегу", () => {
      expect(getElementText("h1")).toBe("Заголовок");
    });

    test("Возвращает null если элемент не найден", () => {
      expect(getElementText("#nonexistent")).toBe(null);
      expect(getElementText(".unknown")).toBe(null);
    });
  });

  describe("setElementText", () => {
    test("Устанавливает текст элемента", () => {
      const result = setElementText("#title", "Новый заголовок");

      expect(result).toBe(true);
      expect(document.querySelector("#title").textContent).toBe(
        "Новый заголовок"
      );
    });

    test("Работает с классами", () => {
      setElementText(".text", "Новый параграф");
      expect(document.querySelector(".text").textContent).toBe("Новый параграф");
    });

    test("Возвращает false если элемент не найден", () => {
      expect(setElementText("#unknown", "Текст")).toBe(false);
    });
  });

  describe("toggleClass", () => {
    test("Добавляет класс и возвращает true", () => {
      const result = toggleClass(".box", "active");

      expect(result).toBe(true);
      expect(document.querySelector(".box").classList.contains("active")).toBe(
        true
      );
    });

    test("Удаляет класс и возвращает false", () => {
      // .btn уже имеет класс active
      const result = toggleClass(".btn", "active");

      expect(result).toBe(false);
      expect(document.querySelector(".btn").classList.contains("active")).toBe(
        false
      );
    });

    test("Переключает класс туда-обратно", () => {
      toggleClass(".box", "highlight"); // добавить
      expect(
        document.querySelector(".box").classList.contains("highlight")
      ).toBe(true);

      toggleClass(".box", "highlight"); // удалить
      expect(
        document.querySelector(".box").classList.contains("highlight")
      ).toBe(false);
    });

    test("Возвращает null если элемент не найден", () => {
      expect(toggleClass("#unknown", "active")).toBe(null);
    });
  });
});
