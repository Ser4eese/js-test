/**
 * createMultiplier — создаёт функцию-множитель (замыкание)
 *
 * @param {number} factor - на что умножать
 * @returns {Function} функция, которая принимает число и умножает его на factor
 *
 * Примеры:
 * const double = createMultiplier(2);
 * double(5) → 10
 * const triple = createMultiplier(3);
 * triple(4) → 12
 */
function createMultiplier(factor) {
    // Ваш код здесь
}

/**
 * mergeObjects — объединяет два объекта с помощью spread оператора
 *
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект (его свойства приоритетнее)
 * @returns {Object} новый объект с объединёнными свойствами
 */
function mergeObjects(obj1, obj2) {
    // Ваш код здесь
}

/**
 * createCounter — создаёт объект-счётчик с методами
 *
 * @param {number} initial - начальное значение (по умолчанию 0)
 * @returns {Object} объект со свойством value и методами increment, decrement, reset
 */
function createCounter(initial = 0) {
    // Ваш код здесь
}

module.exports = { createMultiplier, mergeObjects, createCounter };
