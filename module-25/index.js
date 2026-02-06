/**
 * Модуль 25: POST-запросы и тело запроса
 *
 * Задание: Чтение body и CRUD API для пользователей.
 */

const http = require('http');

/**
 * getBody — читает и парсит JSON из запроса
 *
 * @param {http.IncomingMessage} req - объект запроса
 * @returns {Promise<any>} - распарсенный JSON
 */
function getBody(req) {
  // Ваш код здесь
}

/**
 * createServer — создаёт HTTP-сервер с CRUD API
 *
 * Эндпоинты:
 * - GET /api/users — список пользователей
 * - POST /api/users — создать (body: { name }) → 201
 * - DELETE /api/users/:id — удалить → 204 или 404
 * - Остальное → 404
 *
 * @returns {http.Server}
 */
function createServer() {
  // Данные хранятся в замыкании
  const users = [];
  let nextId = 1;

  // Ваш код здесь
}

module.exports = { getBody, createServer };
