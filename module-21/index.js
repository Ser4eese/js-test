/**
 * Модуль 21: HTTP-запросы с Fetch
 *
 * Задание: Напишите функции для работы с JSONPlaceholder API.
 * Базовый URL: https://jsonplaceholder.typicode.com
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * getPost — получает пост по ID
 *
 * @param {number} id - ID поста
 * @returns {Promise<Object>} - объект поста { userId, id, title, body }
 */
async function getPost(id) {
  // Ваш код здесь
}

/**
 * getPostComments — получает комментарии к посту
 *
 * @param {number} postId - ID поста
 * @returns {Promise<Array>} - массив комментариев
 */
async function getPostComments(postId) {
  // Ваш код здесь
}

/**
 * createPost — создаёт новый пост
 *
 * @param {string} title - заголовок поста
 * @param {string} body - текст поста
 * @param {number} userId - ID автора
 * @returns {Promise<Object>} - созданный пост с id
 */
async function createPost(title, body, userId) {
  // Ваш код здесь
}

/**
 * getUserPosts — получает все посты пользователя
 *
 * @param {number} userId - ID пользователя
 * @returns {Promise<Array>} - массив постов
 */
async function getUserPosts(userId) {
  // Ваш код здесь
}

// Экспорт
module.exports = { getPost, getPostComments, createPost, getUserPosts, BASE_URL };
