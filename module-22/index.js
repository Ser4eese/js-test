/**
 * Модуль 22: Продвинутый Fetch — ошибки и параллельные запросы
 *
 * Задание: Напишите функции для безопасной работы с API.
 */

/**
 * fetchWithError — fetch с проверкой статуса
 *
 * @param {string} url - URL для запроса
 * @returns {Promise<any>} - JSON-данные
 * @throws {Error} - если response.ok === false, выбрасывает Error("HTTP {status}")
 */
async function fetchWithError(url) {
  // Ваш код здесь
}

/**
 * fetchAll — параллельная загрузка нескольких URL
 *
 * @param {string[]} urls - массив URL-адресов
 * @returns {Promise<any[]>} - массив JSON-данных
 * @throws {Error} - если любой запрос упал
 */
async function fetchAll(urls) {
  // Ваш код здесь
}

/**
 * fetchSafe — загрузка с обработкой частичных ошибок
 *
 * @param {string[]} urls - массив URL-адресов
 * @returns {Promise<{succeeded: any[], failed: Array<{url: string, error: string}>}>}
 */
async function fetchSafe(urls) {
  // Ваш код здесь
}

// Экспорт
module.exports = { fetchWithError, fetchAll, fetchSafe };
