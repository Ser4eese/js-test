const { double, triple, square } = require('./index');

describe('Модуль 5: Функции (declaration, expression, arrow)', () => {
    describe('double (Function Declaration)', () => {
        test('double удваивает положительное число', () => {
            expect(double(5)).toBe(10);
        });

        test('double работает с нулем', () => {
            expect(double(0)).toBe(0);
        });

        test('double работает с отрицательным числом', () => {
            expect(double(-3)).toBe(-6);
        });
    });

    describe('triple (Function Expression)', () => {
        test('triple утраивает положительное число', () => {
            expect(triple(4)).toBe(12);
        });

        test('triple работает с нулем', () => {
            expect(triple(0)).toBe(0);
        });

        test('triple работает с отрицательным числом', () => {
            expect(triple(-2)).toBe(-6);
        });
    });

    describe('square (Arrow Function)', () => {
        test('square возводит в квадрат положительное число', () => {
            expect(square(3)).toBe(9);
        });

        test('square работает с нулем', () => {
            expect(square(0)).toBe(0);
        });

        test('square возводит в квадрат отрицательное число', () => {
            expect(square(-4)).toBe(16);
        });
    });
});
