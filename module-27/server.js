/**
 * Модуль 27: TODO-приложение — Backend
 *
 * Задание: Создайте сервер с TODO API.
 */

const http = require('http');

/**
 * getBody — читает JSON из запроса
 */
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * createServer — создаёт HTTP-сервер с TODO API
 *
 * Эндпоинты:
 * - GET    /api/todos     — список задач
 * - POST   /api/todos     — создать { title } → 201
 * - PATCH  /api/todos/:id — переключить completed → 200
 * - DELETE /api/todos/:id — удалить → 204
 * - OPTIONS *             — preflight → 204
 * - Остальное             → 404
 *
 * Все ответы с CORS-заголовками.
 *
 * @returns {http.Server}
 */
function createServer() {
  const todos = [];
  let nextId = 1;

  // Ваш код здесь
}

module.exports = { createServer, getBody };
