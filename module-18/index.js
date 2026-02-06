/**
 * Модуль 18: DOM (Document Object Model)
 *
 * Задание: Напишите три функции для работы с DOM.
 */

/**
 * getElementText — возвращает текстовое содержимое элемента
 *
 * @param {string} selector - CSS-селектор
 * @returns {string|null} - текст элемента или null если не найден
 */
function getElementText(selector) {
  // Ваш код здесь
}

/**
 * setElementText — устанавливает текст элемента
 *
 * @param {string} selector - CSS-селектор
 * @param {string} text - новый текст
 * @returns {boolean} - true если успешно, false если элемент не найден
 */
function setElementText(selector, text) {
  // Ваш код здесь
}

/**
 * toggleClass — переключает класс у элемента
 *
 * @param {string} selector - CSS-селектор
 * @param {string} className - имя класса
 * @returns {boolean|null} - true если добавлен, false если удалён, null если элемент не найден
 */
function toggleClass(selector, className) {
  // Ваш код здесь
}

// Экспорт для Node.js (тесты) и браузера
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getElementText, setElementText, toggleClass };
}
if (typeof window !== 'undefined') {
  window.getElementText = getElementText;
  window.setElementText = setElementText;
  window.toggleClass = toggleClass;
}
