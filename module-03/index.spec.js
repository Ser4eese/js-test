const { getLastElement, getElementAt } = require('./index');

describe('Модуль 3: Массивы — основы работы', () => {
    describe('getLastElement', () => {
        test('возвращает последний элемент массива чисел', () => {
            expect(getLastElement([1, 2, 3, 4, 5])).toBe(5);
        });

        test('работает с массивом строк', () => {
            expect(getLastElement(['a', 'b', 'c'])).toBe('c');
        });

        test('работает с массивом из одного элемента', () => {
            expect(getLastElement([42])).toBe(42);
        });

        test('возвращает undefined для пустого массива', () => {
            expect(getLastElement([])).toBeUndefined();
        });

        test('работает с разными типами данных', () => {
            expect(getLastElement([1, 'hello', true, null])).toBeNull();
        });
    });

    describe('getElementAt', () => {
        test('возвращает элемент по положительному индексу', () => {
            expect(getElementAt([10, 20, 30], 0)).toBe(10);
            expect(getElementAt([10, 20, 30], 1)).toBe(20);
            expect(getElementAt([10, 20, 30], 2)).toBe(30);
        });

        test('возвращает элемент по отрицательному индексу', () => {
            expect(getElementAt([10, 20, 30], -1)).toBe(30);
            expect(getElementAt([10, 20, 30], -2)).toBe(20);
            expect(getElementAt([10, 20, 30], -3)).toBe(10);
        });

        test('возвращает undefined при выходе за границы', () => {
            expect(getElementAt([10, 20, 30], 5)).toBeUndefined();
            expect(getElementAt([10, 20, 30], -4)).toBeUndefined();
        });

        test('возвращает undefined для пустого массива', () => {
            expect(getElementAt([], 0)).toBeUndefined();
            expect(getElementAt([], -1)).toBeUndefined();
        });

        test('работает с массивом из одного элемента', () => {
            expect(getElementAt([42], 0)).toBe(42);
            expect(getElementAt([42], -1)).toBe(42);
        });
    });
});
