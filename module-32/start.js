/**
 * Запуск Notes App для интерактивного тестирования.
 *
 * Использование:
 *   node module-32/start.js
 */

const path = require('path');
const { createStore } = require('./store.js');
const { createApp } = require('./server.js');

const filepath = path.join(__dirname, 'notes.json');
const store = createStore(filepath);
const app = createApp(store);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Notes App running at http://localhost:${PORT}`);
  console.log(`Data file: ${filepath}`);
  console.log('Press Ctrl+C to stop');
});
