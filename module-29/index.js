/**
 * Модуль 29: Express — фреймворк для сервера
 *
 * Задание: Перепишите TODO API на Express.
 *
 * Установка: npm install express
 */

const express = require('express');

/**
 * createApp — создаёт Express-приложение с TODO API
 *
 * Middleware:
 * - express.json()
 * - CORS-заголовки
 *
 * Эндпоинты:
 * - GET    /api/todos      — список
 * - GET    /api/todos/:id  — по id
 * - POST   /api/todos      — создать { title } → 201
 * - PATCH  /api/todos/:id  — toggle completed
 * - DELETE /api/todos/:id  — удалить → 204
 *
 * @returns {express.Application}
 */
function createApp() {
  const app = express();
  const todos = [];
  let nextId = 1;

  // Ваш код здесь
}

module.exports = { createApp };
