/**
 * Модуль 3: Массивы — основы работы
 *
 * Решение: Функция getLastElement возвращает последний элемент массива
 *
 * @param {Array} arr - Массив любых элементов
 * @returns {*} Последний элемент массива или undefined
 */

function getLastElement(arr) {
  // Получаем последний элемент по индексу arr.length - 1
  // Если массив пустой (length === 0), arr[-1] вернет undefined
  return arr[arr.length - 1];
}

module.exports = getLastElement;
