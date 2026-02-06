const fs = require("fs");
const path = require("path");

describe("Модуль 12: npm и package.json", () => {
  const projectPath = path.join(__dirname, "my-project");

  test("Создана папка my-project", () => {
    expect(fs.existsSync(projectPath)).toBe(true);
  });

  test("Существует package.json", () => {
    const packageJsonPath = path.join(projectPath, "package.json");
    expect(fs.existsSync(packageJsonPath)).toBe(true);
  });

  test("Установлена хотя бы одна зависимость", () => {
    const packageJsonPath = path.join(projectPath, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error("package.json не найден");
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    const deps = packageJson.dependencies || {};

    expect(Object.keys(deps).length).toBeGreaterThan(0);
  });

  test("Существует index.js", () => {
    const indexPath = path.join(projectPath, "index.js");
    expect(fs.existsSync(indexPath)).toBe(true);
  });

  test("В package.json есть скрипт start", () => {
    const packageJsonPath = path.join(projectPath, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error("package.json не найден");
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    const scripts = packageJson.scripts || {};

    expect(scripts.start).toBeDefined();
  });
});
