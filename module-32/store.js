/**
 * Модуль 32: Финальный проект — Хранилище
 *
 * Задание: JSON-хранилище для заметок (как в модуле 28).
 */

const fs = require('fs');

/**
 * createStore — создаёт JSON-хранилище
 *
 * Хранилище отвечает только за базовые CRUD-операции:
 * getAll, add (с авто-id), update, remove.
 * Дополнительные поля (например, createdAt) добавляются на уровне сервера (server.js).
 *
 * @param {string} filepath - путь к JSON-файлу
 * @returns {Object} - { getAll, add, update, remove }
 */
function createStore(filepath) {
  // Ваш код здесь
  // Используйте опыт из модуля 28
}

module.exports = { createStore };
