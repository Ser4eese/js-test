/**
 * Модуль 19: События (Events)
 *
 * Задание: Напишите три функции для работы с событиями.
 */

/**
 * onClick — добавляет обработчик клика
 *
 * @param {string} selector - CSS-селектор
 * @param {Function} callback - функция-обработчик, получает event
 * @returns {boolean} - true если успешно, false если элемент не найден
 */
function onClick(selector, callback) {
  // Ваш код здесь
}

/**
 * onInput — добавляет обработчик ввода
 *
 * @param {string} selector - CSS-селектор
 * @param {Function} callback - функция-обработчик, получает value (строку)
 * @returns {boolean} - true если успешно, false если элемент не найден
 */
function onInput(selector, callback) {
  // Ваш код здесь
}

/**
 * onSubmit — добавляет обработчик отправки формы
 *
 * @param {string} selector - CSS-селектор формы
 * @param {Function} callback - функция-обработчик, получает event
 * @returns {boolean} - true если успешно, false если форма не найдена
 */
function onSubmit(selector, callback) {
  // Ваш код здесь
}

// Экспорт для Node.js (тесты) и браузера
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { onClick, onInput, onSubmit };
}
if (typeof window !== 'undefined') {
  window.onClick = onClick;
  window.onInput = onInput;
  window.onSubmit = onSubmit;
}
