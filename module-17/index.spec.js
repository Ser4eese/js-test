const { createHTML } = require("./index.js");

describe("Модуль 17: HTML основы", () => {
  const user = {
    name: "Иван Петров",
    email: "ivan@example.com",
    avatar: "https://example.com/avatar.jpg",
  };

  test("Возвращает строку", () => {
    const result = createHTML(user);
    expect(typeof result).toBe("string");
  });

  test("Содержит div с классом user-card", () => {
    const result = createHTML(user);
    expect(result).toContain('<div class="user-card">');
    expect(result).toContain("</div>");
  });

  test("Содержит img с правильным src и alt", () => {
    const result = createHTML(user);
    expect(result).toContain(`src="${user.avatar}"`);
    expect(result).toContain(`alt="${user.name}"`);
  });

  test("Содержит h2 с именем", () => {
    const result = createHTML(user);
    expect(result).toContain(`<h2>${user.name}</h2>`);
  });

  test("Содержит p с email", () => {
    const result = createHTML(user);
    expect(result).toContain(`<p>${user.email}</p>`);
  });

  test("Работает с разными данными", () => {
    const anotherUser = {
      name: "Мария",
      email: "maria@test.ru",
      avatar: "photo.png",
    };

    const result = createHTML(anotherUser);

    expect(result).toContain('src="photo.png"');
    expect(result).toContain('alt="Мария"');
    expect(result).toContain("<h2>Мария</h2>");
    expect(result).toContain("<p>maria@test.ru</p>");
  });

  test("Элементы в правильном порядке: img, h2, p", () => {
    const result = createHTML(user);

    const imgIndex = result.indexOf("<img");
    const h2Index = result.indexOf("<h2>");
    const pIndex = result.indexOf("<p>");

    expect(imgIndex).toBeLessThan(h2Index);
    expect(h2Index).toBeLessThan(pIndex);
  });
});
