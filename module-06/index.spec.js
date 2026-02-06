const { rotateLeft, rotateRight } = require('./index');

describe('Модуль 6: Методы массивов (push, pop, shift, unshift)', () => {
    describe('rotateLeft', () => {
        test('сдвигает массив влево', () => {
            const arr = [1, 2, 3, 4];
            rotateLeft(arr);
            expect(arr).toEqual([2, 3, 4, 1]);
        });

        test('возвращает перемещённый элемент', () => {
            const arr = [1, 2, 3, 4];
            const result = rotateLeft(arr);
            expect(result).toBe(1);
        });

        test('работает с массивом из одного элемента', () => {
            const arr = [42];
            const result = rotateLeft(arr);
            expect(arr).toEqual([42]);
            expect(result).toBe(42);
        });

        test('возвращает undefined для пустого массива', () => {
            const arr = [];
            const result = rotateLeft(arr);
            expect(result).toBeUndefined();
        });
    });

    describe('rotateRight', () => {
        test('сдвигает массив вправо', () => {
            const arr = [1, 2, 3, 4];
            rotateRight(arr);
            expect(arr).toEqual([4, 1, 2, 3]);
        });

        test('возвращает перемещённый элемент', () => {
            const arr = [1, 2, 3, 4];
            const result = rotateRight(arr);
            expect(result).toBe(4);
        });

        test('работает с массивом из одного элемента', () => {
            const arr = [42];
            const result = rotateRight(arr);
            expect(arr).toEqual([42]);
            expect(result).toBe(42);
        });

        test('возвращает undefined для пустого массива', () => {
            const arr = [];
            const result = rotateRight(arr);
            expect(result).toBeUndefined();
        });
    });
});
