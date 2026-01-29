const sumArray = require('./index');

describe('Модуль 4: Циклы (for, while)', () => {
    test('sumArray суммирует положительные числа', () => {
        const result = sumArray([1, 2, 3, 4, 5]);
        expect(result).toBe(15);
    });

    test('sumArray работает с разными числами', () => {
        const result = sumArray([10, 20, 30]);
        expect(result).toBe(60);
    });

    test('sumArray возвращает 0 для пустого массива', () => {
        const result = sumArray([]);
        expect(result).toBe(0);
    });

    test('sumArray работает с отрицательными числами', () => {
        const result = sumArray([-5, 5, 10]);
        expect(result).toBe(10);
    });

    test('sumArray работает с одним элементом', () => {
        const result = sumArray([100]);
        expect(result).toBe(100);
    });

    test('sumArray работает с массивом из нулей', () => {
        const result = sumArray([0, 0, 0]);
        expect(result).toBe(0);
    });
});
