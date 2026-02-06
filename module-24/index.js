/**
 * Модуль 24: Routing и параметры URL
 *
 * Задание: Парсинг URL и сервер с динамическими маршрутами.
 */

const http = require('http');

// Данные для сервера
const users = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Maria' },
  { id: 3, name: 'Peter' },
  { id: 4, name: 'Anna' },
  { id: 5, name: 'Alex' }
];

/**
 * parseUrl — парсит URL на pathname и query
 *
 * @param {string} urlString - строка URL (например, '/api/users?page=1')
 * @returns {{ pathname: string, query: object }}
 */
function parseUrl(urlString) {
  // Ваш код здесь
}

/**
 * extractId — извлекает числовой ID из пути
 *
 * @param {string} pathname - путь (например, '/users/123')
 * @param {string} prefix - префикс (например, '/users/')
 * @returns {number|null} - ID или null
 */
function extractId(pathname, prefix) {
  // Ваш код здесь
}

/**
 * createServer — создаёт HTTP-сервер с API
 *
 * Эндпоинты:
 * - GET /api/users — список (пагинация: ?page=1&limit=10)
 * - GET /api/users/:id — пользователь по ID
 * - Остальное — 404
 *
 * @returns {http.Server}
 */
function createServer() {
  // Ваш код здесь
}

module.exports = { parseUrl, extractId, createServer, users };
