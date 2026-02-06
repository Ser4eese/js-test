const { createMultiplier, mergeObjects, createCounter } = require('./index');

describe('Модуль 9: Замыкания, методы объектов и spread оператор', () => {
    describe('createMultiplier', () => {
        test('создаёт функцию, которая умножает на заданное число', () => {
            const double = createMultiplier(2);
            expect(double(5)).toBe(10);
            expect(double(3)).toBe(6);
        });

        test('работает с разными множителями', () => {
            const triple = createMultiplier(3);
            const tenTimes = createMultiplier(10);
            expect(triple(4)).toBe(12);
            expect(tenTimes(7)).toBe(70);
        });

        test('каждый вызов createMultiplier создаёт независимую функцию', () => {
            const double = createMultiplier(2);
            const triple = createMultiplier(3);
            expect(double(10)).toBe(20);
            expect(triple(10)).toBe(30);
        });

        test('работает с нулём и отрицательными числами', () => {
            const negate = createMultiplier(-1);
            const zero = createMultiplier(0);
            expect(negate(5)).toBe(-5);
            expect(zero(100)).toBe(0);
        });
    });

    describe('mergeObjects', () => {
        test('объединяет два объекта', () => {
            const result = mergeObjects({ a: 1 }, { b: 2 });
            expect(result).toEqual({ a: 1, b: 2 });
        });

        test('перезаписывает свойства из второго объекта', () => {
            const result = mergeObjects({ a: 1 }, { a: 5 });
            expect(result).toEqual({ a: 5 });
        });

        test('работает с пересекающимися свойствами', () => {
            const result = mergeObjects({ x: 1, y: 2 }, { y: 3, z: 4 });
            expect(result).toEqual({ x: 1, y: 3, z: 4 });
        });

        test('не изменяет исходные объекты', () => {
            const obj1 = { a: 1 };
            const obj2 = { b: 2 };
            mergeObjects(obj1, obj2);
            expect(obj1).toEqual({ a: 1 });
            expect(obj2).toEqual({ b: 2 });
        });
    });

    describe('createCounter', () => {
        test('создаёт счётчик с начальным значением', () => {
            const counter = createCounter(10);
            expect(counter.value).toBe(10);
        });

        test('создаёт счётчик с нулём по умолчанию', () => {
            const counter = createCounter();
            expect(counter.value).toBe(0);
        });

        test('increment увеличивает значение и возвращает его', () => {
            const counter = createCounter(5);
            expect(counter.increment()).toBe(6);
            expect(counter.increment()).toBe(7);
            expect(counter.value).toBe(7);
        });

        test('decrement уменьшает значение и возвращает его', () => {
            const counter = createCounter(5);
            expect(counter.decrement()).toBe(4);
            expect(counter.decrement()).toBe(3);
            expect(counter.value).toBe(3);
        });

        test('reset сбрасывает в начальное значение', () => {
            const counter = createCounter(10);
            counter.increment();
            counter.increment();
            counter.reset();
            expect(counter.value).toBe(10);
        });
    });
});
