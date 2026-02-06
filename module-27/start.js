/**
 * Запуск TODO-сервера для интерактивного тестирования.
 *
 * Использование:
 *   node module-27/start.js
 *
 * Затем откройте module-27/index.html в браузере.
 */

const { createServer } = require('./server.js');

const server = createServer();
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`TODO Server running at http://localhost:${PORT}`);
  console.log('Open module-27/index.html in your browser');
  console.log('Press Ctrl+C to stop');
});
