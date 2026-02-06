/**
 * Модуль 26: CORS — связка фронтенда и бэкенда
 *
 * Задание: Настройка CORS для кросс-доменных запросов.
 */

const http = require('http');

/**
 * addCorsHeaders — добавляет CORS-заголовки к ответу
 *
 * @param {http.ServerResponse} res - объект ответа
 */
function addCorsHeaders(res) {
  // Ваш код здесь
}

/**
 * handlePreflight — обрабатывает OPTIONS (preflight) запрос
 *
 * @param {http.IncomingMessage} req - объект запроса
 * @param {http.ServerResponse} res - объект ответа
 * @returns {boolean} - true если это был OPTIONS и он обработан
 */
function handlePreflight(req, res) {
  // Ваш код здесь
}

/**
 * getBody — читает JSON из запроса (вспомогательная)
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
 * createServer — создаёт HTTP-сервер с CORS
 *
 * Эндпоинты:
 * - OPTIONS * — preflight (204)
 * - GET /api/message → { message: "Hello from API" }
 * - POST /api/echo → возвращает полученный body
 * - Остальное → 404
 *
 * @returns {http.Server}
 */
function createServer() {
  // Ваш код здесь
}

module.exports = { addCorsHeaders, handlePreflight, createServer, getBody };
