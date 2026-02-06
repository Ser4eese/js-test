const { getUnique, countItems } = require('./index');

describe('Модуль 10: Set, Map и хэш-функции', () => {
    describe('getUnique', () => {
        test('удаляет дубликаты чисел', () => {
            const result = getUnique([1, 2, 2, 3, 1, 4]);
            expect(result).toEqual([1, 2, 3, 4]);
        });

        test('удаляет дубликаты строк', () => {
            const result = getUnique(['a', 'b', 'a', 'c']);
            expect(result).toEqual(['a', 'b', 'c']);
        });

        test('возвращает пустой массив для пустого входа', () => {
            const result = getUnique([]);
            expect(result).toEqual([]);
        });

        test('сохраняет порядок первого появления', () => {
            const result = getUnique([3, 1, 2, 1, 3]);
            expect(result).toEqual([3, 1, 2]);
        });

        test('работает с массивом без дубликатов', () => {
            const result = getUnique([1, 2, 3]);
            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('countItems', () => {
        test('считает количество строк', () => {
            const result = countItems(['a', 'b', 'a', 'a']);
            expect(result.get('a')).toBe(3);
            expect(result.get('b')).toBe(1);
        });

        test('считает количество чисел', () => {
            const result = countItems([1, 2, 1, 3, 2, 1]);
            expect(result.get(1)).toBe(3);
            expect(result.get(2)).toBe(2);
            expect(result.get(3)).toBe(1);
        });

        test('возвращает Map', () => {
            const result = countItems(['a', 'b']);
            expect(result instanceof Map).toBe(true);
        });

        test('возвращает пустую Map для пустого массива', () => {
            const result = countItems([]);
            expect(result.size).toBe(0);
        });

        test('правильно считает один элемент', () => {
            const result = countItems(['x']);
            expect(result.get('x')).toBe(1);
            expect(result.size).toBe(1);
        });
    });
});
