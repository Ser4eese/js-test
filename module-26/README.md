# Модуль 26: CORS — связка фронтенда и бэкенда

## 🎯 Цель модуля

Понять что такое CORS, почему браузер блокирует запросы и как это исправить.

---

## 📚 Теория

### Проблема: Same-Origin Policy

Браузер **блокирует** запросы между разными origin (домен + порт):

```
Frontend: http://localhost:5173  ─┐
                                  │ ❌ Blocked by CORS
Backend:  http://localhost:3000  ─┘
```

```javascript
// На фронте (localhost:5173)
fetch('http://localhost:3000/api/users')
// ❌ Access to fetch has been blocked by CORS policy
```

### Что такое Origin?

**Origin** = протокол + домен + порт

```
http://localhost:3000   — один origin
http://localhost:5173   — другой origin (порт разный!)
https://localhost:3000  — третий origin (протокол разный!)
```

### Решение: CORS Headers

Сервер должен явно разрешить запросы с других origin:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
// или конкретный origin:
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
```

### Основные CORS-заголовки

| Заголовок | Описание |
|-----------|----------|
| `Access-Control-Allow-Origin` | Какие origin разрешены (`*` = все) |
| `Access-Control-Allow-Methods` | Какие методы разрешены |
| `Access-Control-Allow-Headers` | Какие заголовки можно отправлять |

### Preflight-запросы (OPTIONS)

Для "сложных" запросов (POST с JSON, PUT, DELETE) браузер сначала отправляет **preflight**:

```
1. Браузер: OPTIONS /api/users (можно ли POST?)
2. Сервер:  200 OK + CORS headers (да, можно)
3. Браузер: POST /api/users (основной запрос)
4. Сервер:  201 Created + data
```

```javascript
// Сервер должен обрабатывать OPTIONS
if (req.method === 'OPTIONS') {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.statusCode = 204;
  res.end();
  return;
}
```

### Полный пример CORS-middleware

```javascript
function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true; // запрос обработан
  }

  return false; // продолжить обработку
}

const server = http.createServer((req, res) => {
  if (cors(req, res)) return;

  // ... остальная логика
});
```

---

## 💡 Примеры

### Пример 1: Простой сервер с CORS

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // CORS для всех запросов
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/data') {
    res.end(JSON.stringify({ message: 'Hello from API!' }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000);
```

### Пример 2: Фронтенд + бэкенд

```javascript
// Backend (server.js) — порт 3000
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify({ users: ['Ivan', 'Maria'] }));
});

// Frontend (index.html) — порт 5173
fetch('http://localhost:3000/api/users')
  .then(res => res.json())
  .then(data => console.log(data));
// ✅ Работает!
```

### Пример 3: Обработка всех методов

```javascript
const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  // GET, POST, DELETE handlers...
});
```

---

## ✏️ Задание

### Описание

Создайте функции для работы с CORS и сервер, доступный с любого origin.

1. `addCorsHeaders(res)` — добавляет CORS-заголовки к ответу
2. `handlePreflight(req, res)` — обрабатывает OPTIONS запрос
3. `createServer()` — сервер с CORS и простым API

### Требования

1. `addCorsHeaders(res)`:
   - Добавляет `Access-Control-Allow-Origin: *`
   - Добавляет `Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS`
   - Добавляет `Access-Control-Allow-Headers: Content-Type`

2. `handlePreflight(req, res)`:
   - Если `req.method === 'OPTIONS'`:
     - Вызывает `addCorsHeaders(res)`
     - Устанавливает статус 204
     - Завершает ответ
     - Возвращает `true`
   - Иначе возвращает `false`

3. `createServer()` — сервер:
   - Использует `handlePreflight` для OPTIONS
   - Добавляет CORS-заголовки ко всем ответам
   - `GET /api/message` → `{ message: "Hello from API" }`
   - `POST /api/echo` → возвращает полученный body
   - Остальное → 404

### Примеры

```javascript
// OPTIONS /api/message → 204 (no content) + CORS headers

// GET /api/message → { message: "Hello from API" }

// POST /api/echo с body { data: "test" }
// → { data: "test" }

// Все ответы содержат заголовок:
// Access-Control-Allow-Origin: *
```

---

## 💭 Подсказки

<details>
<summary>Подсказка 1: Направление</summary>

Какие три HTTP-заголовка нужно установить для разрешения кросс-доменных запросов? Почему браузер перед «сложным» запросом (POST с JSON) сначала отправляет запрос методом OPTIONS, и как сервер должен на него ответить?
</details>

<details>
<summary>Подсказка 2: Структура</summary>

Разбейте задачу на три функции с чёткими обязанностями. Первая функция устанавливает три CORS-заголовка через `res.setHeader`. Вторая проверяет метод запроса и, если это preflight, вызывает первую функцию, отвечает без тела и сообщает вызывающему коду, что запрос обработан (через возвращаемое значение `true`/`false`). Третья создаёт сервер, в начале обработки каждого запроса проверяет preflight, затем добавляет CORS-заголовки, и дальше маршрутизирует по method/url.

</details>

<details>
<summary>Подсказка 3: Подход</summary>

`addCorsHeaders` — установите три заголовка: `Access-Control-Allow-Origin` со значением `*`, `Access-Control-Allow-Methods` со списком разрешённых методов (GET, POST, DELETE, OPTIONS) и `Access-Control-Allow-Headers` со значением `Content-Type`.

`handlePreflight` — проверьте, что метод равен `OPTIONS`. Если да — вызовите `addCorsHeaders`, установите статус 204, завершите ответ через `res.end()` и верните `true`. Иначе — верните `false`.

`createServer` — в обработчике сначала вызовите `handlePreflight` и при `true` — выйдите. Затем вызовите `addCorsHeaders` и установите `Content-Type: application/json`. Для GET на `/api/message` — верните JSON с полем `message`. Для POST на `/api/echo` — прочитайте body (используйте вспомогательную функцию из модуля 25 или аналогичную) и верните его как есть. Всё остальное — статус 404.

</details>

---

## 🧪 Как проверить решение

```bash
npx vitest module-26/index.spec.js
```

### Проверка в браузере

1. Запустите сервер: `node -e "require('./module-26/index.js').createServer().listen(3000)"`
2. Откройте любой сайт в браузере
3. В консоли выполните:
```javascript
fetch('http://localhost:3000/api/message')
  .then(r => r.json())
  .then(console.log)
// Должно работать без ошибок CORS!
```

---

## 📖 Дополнительные материалы

- [MDN: CORS](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS)
- [web.dev: CORS](https://web.dev/cross-origin-resource-sharing/)

---

## ❓ Частые вопросы

**Q: Почему `*` небезопасен в продакшене?**

A: Любой сайт сможет делать запросы к вашему API. Лучше указывать конкретные разрешённые origin.

**Q: Почему простой GET работает, а POST с JSON — нет?**

A: POST с `Content-Type: application/json` считается "сложным" запросом и требует preflight (OPTIONS).

**Q: Как разрешить несколько origin?**

A: Проверяйте `req.headers.origin` и устанавливайте его в `Allow-Origin`, если он в списке разрешённых.

**Q: CORS — это защита сервера?**

A: Нет! CORS — защита браузера/пользователя. curl и другие клиенты игнорируют CORS. Сервер всё равно должен проверять авторизацию.

---

## 🎓 Что дальше?

Переходите к **Модуль 27: TODO-приложение** — соберём полноценное приложение с фронтом и бэком.
