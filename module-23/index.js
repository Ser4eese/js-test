/**
 * Модуль 23: Создание HTTP-сервера
 *
 * Задание: Создайте функцию createServer(), которая возвращает HTTP-сервер.
 */

const http = require('http');

/**
 * createServer — создаёт и возвращает HTTP-сервер
 *
 * Эндпоинты:
 * - GET /          → { message: "Welcome to API" }
 * - GET /api/health → { status: "ok" }
 * - GET /api/time   → { time: "<ISO string>" }
 * - Всё остальное  → 404 { error: "Not found" }
 *
 * @returns {http.Server}
 */
function createServer() {
  // Ваш код здесь
}

module.exports = { createServer };
