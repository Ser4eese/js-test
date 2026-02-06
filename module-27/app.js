/**
 * Модуль 27: TODO-приложение — Frontend
 *
 * Задание: Напишите функции для работы с API и DOM.
 */

/**
 * fetchTodos — загружает список задач
 *
 * @param {string} baseUrl - базовый URL сервера
 * @returns {Promise<Array>} - массив задач
 */
async function fetchTodos(baseUrl) {
  // Ваш код здесь
}

/**
 * addTodo — создаёт новую задачу
 *
 * @param {string} baseUrl - базовый URL сервера
 * @param {string} title - текст задачи
 * @returns {Promise<Object>} - созданная задача
 */
async function addTodo(baseUrl, title) {
  // Ваш код здесь
}

/**
 * toggleTodo — переключает completed у задачи
 *
 * @param {string} baseUrl - базовый URL сервера
 * @param {number} id - ID задачи
 * @returns {Promise<Object>} - обновлённая задача
 */
async function toggleTodo(baseUrl, id) {
  // Ваш код здесь
}

/**
 * deleteTodo — удаляет задачу
 *
 * @param {string} baseUrl - базовый URL сервера
 * @param {number} id - ID задачи
 * @returns {Promise<boolean>} - true
 */
async function deleteTodo(baseUrl, id) {
  // Ваш код здесь
}

/**
 * renderTodos — отрисовывает задачи в DOM
 *
 * Каждая задача:
 * <li class="completed?">
 *   <span class="todo-title">текст</span>
 *   <button class="delete-btn">×</button>
 * </li>
 *
 * @param {Array} todos - массив задач
 * @param {HTMLElement} container - контейнер (ul/ol)
 */
function renderTodos(todos, container) {
  // Ваш код здесь
}

// Экспорт для Node.js (тесты)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchTodos, addTodo, toggleTodo, deleteTodo, renderTodos };
}
