/**
 * Модуль 32: Финальный проект — Backend
 *
 * Задание: Express API для заметок.
 */

const express = require('express');

/**
 * createApp — создаёт Express-приложение
 *
 * @param {Object} store - хранилище с методами getAll, add, update, remove
 * @returns {express.Application}
 *
 * Эндпоинты:
 * - GET    /api/notes      — список
 * - POST   /api/notes      — создать { title, text } → 201
 * - PATCH  /api/notes/:id  — обновить { title?, text? }
 * - DELETE /api/notes/:id  — удалить → 204
 *
 * Middleware: express.json(), CORS
 */
function createApp(store) {
  const app = express();

  // Ваш код здесь
}

module.exports = { createApp };
