# Модуль 29: Express — фреймворк для сервера

## 🎯 Цель модуля

Переписать сервер с чистого http на Express — увидеть как фреймворк упрощает код.

---

## 📚 Теория

### Зачем Express?

Сравните один и тот же эндпоинт:

```javascript
// ❌ Чистый http (как в модулях 23-27)
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET' && req.url === '/api/users') {
    res.end(JSON.stringify(users));
  } else if (req.method === 'POST' && req.url === '/api/users') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      // ...
    });
  }
});
```

```javascript
// ✅ Express
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const data = req.body; // Уже распарсено!
  // ...
});
```

### Основы Express

```javascript
const express = require('express');
const app = express();

// Middleware — обрабатывает ВСЕ запросы
app.use(express.json());  // Парсит JSON body

// Маршруты
app.get('/path', handler);     // GET
app.post('/path', handler);    // POST
app.patch('/path', handler);   // PATCH
app.delete('/path', handler);  // DELETE

// Запуск
app.listen(3000);
```

### Handler (обработчик)

```javascript
app.get('/api/users', (req, res) => {
  // req.params  — параметры пути (:id)
  // req.query   — query-параметры (?page=1)
  // req.body    — тело запроса (POST/PATCH)

  res.json(data);          // Отправить JSON (автоматически)
  res.status(201).json(x); // Со статусом
  res.sendStatus(204);     // Только статус, без тела
});
```

### Параметры пути

```javascript
// :id — динамический параметр
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json(user);
});
```

### Query-параметры

```javascript
// GET /api/users?page=2&limit=10
app.get('/api/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const start = (page - 1) * limit;
  const result = users.slice(start, start + limit);

  res.json(result);
});
```

### Middleware

```javascript
// Выполняется для КАЖДОГО запроса
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Передать дальше
});

// Встроенные middleware
app.use(express.json());           // Парсит JSON body
app.use(express.static('public')); // Раздаёт статические файлы
```

### CORS в Express

```javascript
// Вручную
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
```

---

## 💡 Примеры

### Пример 1: Минимальный сервер

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello Express!' });
});

app.listen(3000);
```

### Пример 2: CRUD API

```javascript
const express = require('express');
const app = express();
app.use(express.json());

let items = [];
let nextId = 1;

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: nextId++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.sendStatus(204);
});
```

---

## ✏️ Задание

### Описание

Перепишите TODO API из модуля 27 на Express.

Создайте функцию `createApp()`, которая возвращает настроенное Express-приложение.

### Требования

1. Middleware:
   - `express.json()` для парсинга body
   - CORS-заголовки для всех запросов (middleware)

2. Эндпоинты:
   - `GET /api/todos` — список задач
   - `GET /api/todos/:id` — задача по id (404 если нет)
   - `POST /api/todos` — создать `{ title }` → 201
   - `PATCH /api/todos/:id` — toggle completed → 200 (404 если нет)
   - `DELETE /api/todos/:id` — удалить → 204 (404 если нет)

3. Формат ошибки: `{ error: "Todo not found" }`

### Примеры

```javascript
const app = createApp();

// GET /api/todos → []

// POST /api/todos + { title: "Buy milk" }
// → 201 { id: 1, title: "Buy milk", completed: false }

// GET /api/todos/1
// → { id: 1, title: "Buy milk", completed: false }

// PATCH /api/todos/1
// → { id: 1, title: "Buy milk", completed: true }

// DELETE /api/todos/1
// → 204

// GET /api/todos/999
// → 404 { error: "Todo not found" }
```

---

## 💭 Подсказки

<details>
<summary>Подсказка 1: Направление</summary>

Функция `createApp()` должна создать Express-приложение, подключить middleware (парсинг JSON и CORS-заголовки) и зарегистрировать маршруты. Какие HTTP-методы соответствуют операциям чтения, создания, обновления и удаления?
</details>

<details>
<summary>Подсказка 2: Структура</summary>

Функция `createApp` создаёт Express-приложение, подключает middleware для парсинга JSON и CORS, затем регистрирует пять маршрутов (два GET, POST, PATCH, DELETE). CORS-middleware — это обычная функция `(req, res, next)`, которая устанавливает заголовки и для OPTIONS отвечает 204. В Express параметры пути (`:id`) доступны через `req.params.id`, а тело запроса — через `req.body`.

</details>

<details>
<summary>Подсказка 3: Подход</summary>

Подключите `express.json()` для автоматического парсинга body. Создайте CORS-middleware, который устанавливает три заголовка (`Allow-Origin: *`, `Allow-Methods`, `Allow-Headers: Content-Type`) и для метода OPTIONS отвечает `sendStatus(204)` без вызова `next()`, а для остальных — вызывает `next()`.

Для GET `/api/todos` — отдайте весь массив через `res.json`. Для GET `/api/todos/:id` — достаньте id из `req.params.id`, преобразуйте в число, найдите через `find`; если не найден — `res.status(404).json` с ошибкой. Для POST — создайте объект с id (из счётчика), title (из `req.body.title`) и `completed: false`, добавьте в массив, ответьте `res.status(201).json`. Для PATCH — найдите задачу, инвертируйте `completed`, верните обновлённую (или 404). Для DELETE — найдите индекс, удалите через `splice`, ответьте `sendStatus(204)` (или 404).

</details>

---

## 🧪 Как проверить решение

```bash
npx vitest module-29/index.spec.js
```

---

## 📖 Дополнительные материалы

- [Express.js: Getting Started](https://expressjs.com/ru/starter/hello-world.html)
- [Express.js: Routing](https://expressjs.com/ru/guide/routing.html)
- [Express.js: Middleware](https://expressjs.com/ru/guide/using-middleware.html)

---

## ❓ Частые вопросы

**Q: Чем Express лучше чистого http?**

A: Роутинг из коробки, автопарсинг body, middleware, параметры пути (:id), удобный API ответов. Код короче и читаемее.

**Q: Что такое `next()`?**

A: Функция, которая передаёт управление следующему middleware или маршруту. Если не вызвать — запрос "зависнет".

**Q: Зачем `return` перед `res.status(404).json(...)`?**

A: Чтобы выйти из функции. Без `return` код продолжит выполняться и может отправить второй ответ (ошибка).

**Q: Express 4 или Express 5?**

A: Express 4 — стабильная версия, используется повсеместно. Express 5 — в разработке.

---

## 🎓 Что дальше?

Переходите к **Модуль 30: React** — изучим главный фреймворк для фронтенда.
