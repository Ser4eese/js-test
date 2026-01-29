const getLastElement = require('./index');

describe('Модуль 3: Массивы — основы работы', () => {
    test('getLastElement возвращает последний элемент массива чисел', () => {
        const result = getLastElement([1, 2, 3, 4, 5]);
        expect(result).toBe(5);
    });

    test('getLastElement работает с массивом строк', () => {
        const result = getLastElement(['a', 'b', 'c']);
        expect(result).toBe('c');
    });

    test('getLastElement работает с массивом из одного элемента', () => {
        const result = getLastElement([42]);
        expect(result).toBe(42);
    });

    test('getLastElement возвращает undefined для пустого массива', () => {
        const result = getLastElement([]);
        expect(result).toBeUndefined();
    });

    test('getLastElement работает с разными типами данных', () => {
        const result = getLastElement([1, 'hello', true, null]);
        expect(result).toBeNull();
    });
});
