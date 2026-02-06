const { createUser, formatUser } = require('./index');

describe('Модуль 7: Объекты (создание, доступ к свойствам)', () => {
    describe('createUser', () => {
        test('создаёт объект с именем и возрастом', () => {
            const user = createUser('Иван', 25);
            expect(user).toEqual({ name: 'Иван', age: 25 });
        });

        test('создаёт объект с другими данными', () => {
            const user = createUser('Мария', 30);
            expect(user).toEqual({ name: 'Мария', age: 30 });
        });

        test('свойства доступны через точку', () => {
            const user = createUser('Петр', 35);
            expect(user.name).toBe('Петр');
            expect(user.age).toBe(35);
        });
    });

    describe('formatUser', () => {
        test('форматирует информацию о пользователе', () => {
            const result = formatUser({ name: 'Иван', age: 25 });
            expect(result).toBe('Имя: Иван, Возраст: 25');
        });

        test('работает с другими данными', () => {
            const result = formatUser({ name: 'Мария', age: 30 });
            expect(result).toBe('Имя: Мария, Возраст: 30');
        });

        test('работает с объектом от createUser', () => {
            const user = createUser('Петр', 35);
            const result = formatUser(user);
            expect(result).toBe('Имя: Петр, Возраст: 35');
        });
    });
});
