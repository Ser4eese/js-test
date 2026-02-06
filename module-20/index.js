/**
 * Модуль 20: Формы и валидация
 *
 * Задание: Напишите функции для сбора и валидации данных формы.
 */

/**
 * getFormData — собирает данные из формы в объект
 *
 * @param {string} selector - CSS-селектор формы
 * @returns {Object|null} - объект с данными или null если форма не найдена
 */
function getFormData(selector) {
  // Ваш код здесь
}

/**
 * validateForm — валидирует данные формы
 *
 * @param {Object} data - объект с полями username, email, password
 * @returns {Object} - { isValid: boolean, errors: object }
 */
function validateForm(data) {
  // Ваш код здесь
}

// Экспорт для Node.js (тесты) и браузера
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getFormData, validateForm };
}
if (typeof window !== 'undefined') {
  window.getFormData = getFormData;
  window.validateForm = validateForm;
}
