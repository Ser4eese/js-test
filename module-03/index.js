/**
 * Модуль 3: Массивы — основы работы
 *
 * Задание 1: Напишите функцию getLastElement, которая возвращает
 * последний элемент массива.
 *
 * @param {Array} arr - Массив любых элементов
 * @returns {*} Последний элемент массива или undefined
 *
 * Примеры:
 * getLastElement([1, 2, 3, 4, 5]) → 5
 * getLastElement(['a', 'b', 'c']) → 'c'
 * getLastElement([]) → undefined
 */

function getLastElement(arr) {
    // Ваш код здесь
}

/**
 * Задание 2: Напишите функцию getElementAt, которая возвращает
 * элемент массива по индексу. Поддерживает отрицательные индексы:
 * -1 — последний элемент, -2 — предпоследний и т.д.
 *
 * @param {Array} arr - Массив любых элементов
 * @param {number} index - Индекс (может быть отрицательным)
 * @returns {*} Элемент массива или undefined
 *
 * Примеры:
 * getElementAt([10, 20, 30], 0) → 10
 * getElementAt([10, 20, 30], -1) → 30
 * getElementAt([10, 20, 30], -2) → 20
 * getElementAt([10, 20, 30], 5) → undefined
 */

function getElementAt(arr, index) {
    // Ваш код здесь
}

module.exports = { getLastElement, getElementAt };
