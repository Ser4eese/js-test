const checkAccess = require('./index');

describe('Модуль 2: Условия и операторы сравнения', () => {
    test('Возраст меньше 18 - доступ запрещен', () => {
        expect(checkAccess(16, false)).toBe("Доступ запрещен: возраст менее 18 лет");
        expect(checkAccess(16, true)).toBe("Доступ запрещен: возраст менее 18 лет");
        expect(checkAccess(17, false)).toBe("Доступ запрещен: возраст менее 18 лет");
    });

    test('Возраст >= 18 и премиум - полный доступ', () => {
        expect(checkAccess(18, true)).toBe("Полный доступ");
        expect(checkAccess(25, true)).toBe("Полный доступ");
        expect(checkAccess(100, true)).toBe("Полный доступ");
    });

    test('Возраст >= 18 и не премиум - базовый доступ', () => {
        expect(checkAccess(18, false)).toBe("Базовый доступ");
        expect(checkAccess(25, false)).toBe("Базовый доступ");
        expect(checkAccess(50, false)).toBe("Базовый доступ");
    });

    test('Граничные случаи', () => {
        expect(checkAccess(18, true)).toBe("Полный доступ");
        expect(checkAccess(18, false)).toBe("Базовый доступ");
    });
});
