/**
 * Модуль 8: Debugging (Отладка)
 *
 * Задание: Найдите и исправьте баги в функциях ниже.
 * Используйте console.log, debugger или DevTools для отладки.
 */

/**
 * sumPositive — суммирует только положительные числа
 * БАГ: функция работает неправильно, найдите ошибку
 *
 * @param {number[]} numbers - массив чисел
 * @returns {number} - сумма положительных чисел
 */
function sumPositive(numbers) {
  let sum = 0;

  for (const num of numbers) {
    // Баг где-то здесь...
    if (num >= 0) {
      sum += num;
    }
  }

  return sum;
}

/**
 * getFullName — возвращает полное имя пользователя
 * БАГ: функция возвращает неправильный результат
 *
 * @param {Object} user - объект с firstName и lastName
 * @returns {string} - "Имя Фамилия"
 */
function getFullName(user) {
  // Баг где-то здесь...
  return `${user.lastName} ${user.firstName}`;
}

/**
 * filterAdults — фильтрует пользователей 18+ лет
 * БАГ: функция пропускает некоторых взрослых
 *
 * @param {Object[]} users - массив пользователей с полем age
 * @returns {Object[]} - пользователи 18 лет и старше
 */
function filterAdults(users) {
  // Баг где-то здесь...
  return users.filter(user => user.age > 18);
}

module.exports = { sumPositive, getFullName, filterAdults };
