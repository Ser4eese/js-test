const createGreeting = require('./index');

describe('Модуль 1: Переменные и типы данных', () => {
    test('createGreeting возвращает правильное приветствие', () => {
        const result = createGreeting("Иван", 20);
        expect(result).toBe("Привет, Иван! Тебе 20 лет.");
    });

    test('createGreeting работает с другим именем', () => {
        const result = createGreeting("Мария", 25);
        expect(result).toBe("Привет, Мария! Тебе 25 лет.");
    });

    test('createGreeting работает с разными значениями возраста', () => {
        const result = createGreeting("Петр", 18);
        expect(result).toBe("Привет, Петр! Тебе 18 лет.");
    });

    test('createGreeting корректно обрабатывает большие числа', () => {
        const result = createGreeting("Анна", 100);
        expect(result).toBe("Привет, Анна! Тебе 100 лет.");
    });
});
