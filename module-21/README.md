# Модуль 21: HTTP-запросы с Fetch

## 🎯 Цель модуля

Научиться делать HTTP-запросы к API и обрабатывать ответы.

---

## 📚 Теория

### Fetch API

```javascript
// Простой GET-запрос
const response = await fetch('https://api.example.com/users');
const data = await response.json();

// POST-запрос
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Ivan' })
});
```

### Структура Response

```javascript
const response = await fetch(url);

response.ok        // true если статус 200-299
response.status    // 200, 404, 500...
response.headers   // заголовки ответа

// Получить тело ответа:
await response.json()  // как JSON
await response.text()  // как текст
```

### HTTP-методы

| Метод | Назначение | Пример |
|-------|------------|--------|
| `GET` | Получить данные | Список пользователей |
| `POST` | Создать | Новый пост |
| `PUT` | Обновить | Изменить пост |
| `DELETE` | Удалить | Удалить пост |

### JSONPlaceholder API

Бесплатный тестовый API: `https://jsonplaceholder.typicode.com`

| Endpoint | Описание |
|----------|----------|
| `/posts` | Посты (100 шт) |
| `/posts/1` | Пост с id=1 |
| `/users` | Пользователи (10 шт) |
| `/users/1` | Пользователь с id=1 |
| `/comments` | Комментарии |

---

## 💡 Примеры

### GET-запрос

```javascript
async function getUser(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const user = await response.json();
  return user;
}

const user = await getUser(1);
// { id: 1, name: "Leanne Graham", email: "..." }
```

### POST-запрос

```javascript
async function createPost(title, body, userId) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId })
    }
  );
  return await response.json();
}
```

### Обработка ошибок

```javascript
async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}
```

---

## ✏️ Задание

### Описание

Напишите функции для работы с JSONPlaceholder API:

1. `getPost(id)` — получить пост по ID
2. `getPostComments(postId)` — получить комментарии к посту
3. `createPost(title, body, userId)` — создать новый пост
4. `getUserPosts(userId)` — получить все посты пользователя

### Требования

Базовый URL: `https://jsonplaceholder.typicode.com`

1. `getPost(id)`:
   - GET `/posts/{id}`
   - Возвращает объект поста

2. `getPostComments(postId)`:
   - GET `/posts/{postId}/comments`
   - Возвращает массив комментариев

3. `createPost(title, body, userId)`:
   - POST `/posts`
   - Тело: `{ title, body, userId }`
   - Заголовок: `Content-Type: application/json`
   - Возвращает созданный пост (с id)

4. `getUserPosts(userId)`:
   - GET `/users/{userId}/posts`
   - Возвращает массив постов пользователя

### Примеры использования

```javascript
const post = await getPost(1);
// { userId: 1, id: 1, title: "...", body: "..." }

const comments = await getPostComments(1);
// [{ postId: 1, id: 1, name: "...", email: "...", body: "..." }, ...]

const newPost = await createPost("Мой заголовок", "Текст поста", 1);
// { id: 101, title: "Мой заголовок", body: "Текст поста", userId: 1 }

const userPosts = await getUserPosts(1);
// [{ userId: 1, id: 1, ... }, { userId: 1, id: 2, ... }, ...]
```

---

## 💭 Подсказки

<details>
<summary>Подсказка 1: Направление</summary>
Все GET-функции устроены одинаково: вызвать `fetch` с правильным URL и вернуть результат парсинга JSON. Для POST-запроса нужно передать второй аргумент в `fetch` с настройками метода, заголовков и тела. Какой метод объекта `JSON` превращает объект в строку?
</details>

<details>
<summary>Подсказка 2: Структура</summary>

Все GET-функции устроены одинаково: вызвать `fetch` с правильным URL (базовый URL + эндпоинт), дождаться ответа и вернуть результат вызова `.json()`. Для POST-запроса нужно передать вторым аргументом объект настроек с полями `method`, `headers` и `body`.

</details>

<details>
<summary>Подсказка 3: Подход</summary>

Для `getPost` — отправьте GET-запрос на `/posts/{id}` и верните распарсенный JSON. Для `getPostComments` — эндпоинт `/posts/{postId}/comments`. Для `getUserPosts` — эндпоинт `/users/{userId}/posts`. Все три функции асинхронные и работают одинаково: `fetch` + `.json()`. Для `createPost` — отправьте POST-запрос на `/posts`, указав заголовок `Content-Type: application/json` и сериализовав тело запроса через `JSON.stringify` с полями `title`, `body`, `userId`.

</details>

---

## 🧪 Как проверить решение

```bash
npx vitest module-21/index.spec.js
```

---

## 📖 Дополнительные материалы

- [MDN: Fetch API](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [JavaScript.info: Fetch](https://learn.javascript.ru/fetch)

---

## 🎓 Что дальше?

Переходите к **Модуль 22: Продвинутый Fetch** — научитесь обрабатывать ошибки HTTP-запросов и выполнять параллельные запросы с помощью `Promise.all` и `Promise.allSettled`.
