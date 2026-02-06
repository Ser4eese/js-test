# Модуль 24: Routing и параметры URL

## 🎯 Цель модуля

Научиться обрабатывать динамические пути (`/users/123`) и query-параметры (`?page=1`).

---

## 📚 Теория

### Структура URL

```
http://localhost:3000/api/users/5?sort=name&limit=10
└──────────────────┘└──────────┘└┘└────────────────┘
       origin          path     │   query string
                                │
                          параметр пути (id=5)
```

### Параметры пути (Path Parameters)

```
/users/123      → id = 123
/posts/456      → id = 456
/users/5/posts  → userId = 5
```

Извлечение вручную:

```javascript
const url = '/users/123';
const parts = url.split('/');
// ['', 'users', '123']
const id = parts[2];  // '123'
```

### Query-параметры

```
/api/users?page=2&limit=10
```

Извлечение через URL API:

```javascript
const url = new URL(req.url, 'http://localhost');

url.pathname        // '/api/users'
url.searchParams    // URLSearchParams объект

url.searchParams.get('page')   // '2'
url.searchParams.get('limit')  // '10'
url.searchParams.get('foo')    // null
```

### Полный пример парсинга

```javascript
function parseUrl(reqUrl) {
  const url = new URL(reqUrl, 'http://localhost');

  return {
    pathname: url.pathname,
    query: Object.fromEntries(url.searchParams)
  };
}

parseUrl('/api/users?page=2&sort=name');
// {
//   pathname: '/api/users',
//   query: { page: '2', sort: 'name' }
// }
```

### Простой роутер

```javascript
function matchRoute(pathname, pattern) {
  // pattern: '/users/:id'
  // pathname: '/users/123'

  const patternParts = pattern.split('/');
  const pathParts = pathname.split('/');

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      // Динамический параметр
      const paramName = patternParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

matchRoute('/users/123', '/users/:id');
// { id: '123' }

matchRoute('/posts/5/comments/10', '/posts/:postId/comments/:commentId');
// { postId: '5', commentId: '10' }
```

---

## 💡 Примеры

### Пример 1: Сервер с параметрами пути

```javascript
const http = require('http');

const users = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Maria' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // GET /api/users/:id
  const match = req.url.match(/^\/api\/users\/(\d+)$/);

  if (match) {
    const id = parseInt(match[1]);
    const user = users.find(u => u.id === id);

    if (user) {
      res.end(JSON.stringify(user));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'User not found' }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});
```

### Пример 2: Query-параметры для пагинации

```javascript
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/users') {
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;

    const start = (page - 1) * limit;
    const paginatedUsers = users.slice(start, start + limit);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(paginatedUsers));
    // Возвращаем просто массив, например: [{ id: 1, ... }, { id: 2, ... }]
  }
});
```

---

## ✏️ Задание

### Описание

Напишите функции для парсинга URL и создайте сервер с динамическими маршрутами.

1. `parseUrl(url)` — парсит URL на pathname и query
2. `extractId(pathname, prefix)` — извлекает ID из пути
3. `createServer()` — сервер с API для работы с пользователями

### Требования

1. `parseUrl(url)`:
   - Принимает строку URL (например, `/api/users?page=1`)
   - Возвращает `{ pathname, query }`
   - `query` — объект с параметрами

2. `extractId(pathname, prefix)`:
   - Извлекает числовой ID после префикса
   - `extractId('/users/123', '/users/')` → `123`
   - Если ID нет или он не число — возвращает `null`

3. `createServer()` — сервер с эндпоинтами:
   - `GET /api/users` — список пользователей (с пагинацией через `?page=&limit=`)
   - `GET /api/users/:id` — пользователь по ID
   - `404` для остальных

Данные для сервера:
```javascript
const users = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Maria' },
  { id: 3, name: 'Peter' },
  { id: 4, name: 'Anna' },
  { id: 5, name: 'Alex' }
];
```

### Примеры

```javascript
parseUrl('/api/users?page=2&limit=10');
// { pathname: '/api/users', query: { page: '2', limit: '10' } }

parseUrl('/api/users/5');
// { pathname: '/api/users/5', query: {} }

extractId('/users/123', '/users/');  // 123
extractId('/users/abc', '/users/');  // null
extractId('/posts/5', '/users/');    // null

// Сервер:
// GET /api/users → [все пользователи]
// GET /api/users?page=1&limit=2 → [{ id: 1, ... }, { id: 2, ... }]
// GET /api/users/3 → { id: 3, name: 'Peter' }
// GET /api/users/999 → 404 { error: 'User not found' }
```

---

## 💭 Подсказки

<details>
<summary>Подсказка 1: Направление</summary>

Для парсинга URL подумайте, какой встроенный класс в JavaScript разбирает строку URL на составные части (pathname, search params). Для извлечения ID — как проверить, что строка начинается с определённого префикса, и как получить остаток после него?
</details>

<details>
<summary>Подсказка 2: Структура</summary>

Для парсинга URL используйте встроенный класс `new URL()` (с фиктивным базовым адресом для относительных путей). Он даёт доступ к `pathname` и `searchParams`, из которых можно собрать нужный объект. Для извлечения ID проверьте, начинается ли путь с нужного префикса, и возьмите остаток строки после него.

</details>

<details>
<summary>Подсказка 3: Подход</summary>

Для `parseUrl` — создайте `new URL(urlString, 'http://localhost')`, возьмите `pathname` и преобразуйте `searchParams` в объект через `Object.fromEntries()`. Для `extractId` — проверьте, что `pathname` начинается с `prefix` (через `startsWith`), вырежьте остаток строки после префикса (через `slice` с длиной префикса), преобразуйте в число через `parseInt` и верните `null` если результат `NaN`, иначе само число. В `createServer` используйте `parseUrl` для разбора `req.url`, затем: если путь точно равен `/api/users` — верните список пользователей с пагинацией (получите `page` и `limit` из query, вычислите смещение и используйте `slice` на массиве). Если путь начинается с `/api/users/` — извлеките ID через `extractId`, найдите пользователя в массиве и верните его, либо 404 если не найден. Для всех остальных путей — 404.

</details>

---

## 🧪 Как проверить решение

```bash
npx vitest module-24/index.spec.js
```

---

## 📖 Дополнительные материалы

- [MDN: URL](https://developer.mozilla.org/ru/docs/Web/API/URL)
- [MDN: URLSearchParams](https://developer.mozilla.org/ru/docs/Web/API/URLSearchParams)

---

## ❓ Частые вопросы

**Q: Почему query-параметры — строки?**

A: HTTP передаёт всё как текст. `?page=2` — это строка "2". Нужно преобразовывать: `parseInt(page)`.

**Q: Как обрабатывать `/users/123/posts/456`?**

A: Либо регулярными выражениями, либо пошагово через split и проверку частей. Фреймворки (Express) делают это автоматически.

**Q: Зачем нужен базовый URL в `new URL()`?**

A: `new URL('/path')` выдаст ошибку — нужен полный URL. Добавляем фиктивный `http://localhost` чтобы парсить относительные пути.

---

## 🎓 Что дальше?

Переходите к **Модуль 25: POST-запросы** — научитесь принимать данные от клиента.
