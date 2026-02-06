# Модуль 22: Продвинутый Fetch — ошибки и параллельные запросы

## 🎯 Цель модуля

Научиться обрабатывать ошибки HTTP-запросов и выполнять несколько запросов параллельно.

---

## 📚 Теория

### Проблема: fetch не выбрасывает ошибку при 404/500

```javascript
// ❌ Это НЕ вызовет ошибку!
const response = await fetch('/api/users/999');
// response.status = 404, но ошибки нет

// ✅ Нужно проверять вручную
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

### Правильная обработка ошибок

```javascript
async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}

// Использование
try {
  const data = await fetchJSON('/api/users/1');
  console.log(data);
} catch (error) {
  console.error('Ошибка:', error.message);
}
```

### Promise.all — параллельные запросы

Когда нужно получить данные из нескольких источников:

```javascript
// ❌ Последовательно — медленно
const users = await fetch('/api/users').then(r => r.json());
const posts = await fetch('/api/posts').then(r => r.json());
// Общее время = время1 + время2

// ✅ Параллельно — быстро
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
// Общее время = max(время1, время2)
```

### Promise.all с обработкой ошибок

```javascript
try {
  const [users, posts] = await Promise.all([
    fetchJSON('/api/users'),
    fetchJSON('/api/posts')
  ]);
} catch (error) {
  // Если ЛЮБОЙ запрос упал — попадаем сюда
  console.error('Один из запросов не удался:', error);
}
```

### Promise.allSettled — все результаты

Если нужны результаты даже при частичных ошибках:

```javascript
const results = await Promise.allSettled([
  fetchJSON('/api/users'),
  fetchJSON('/api/broken'),  // Упадёт
  fetchJSON('/api/posts')
]);

// [
//   { status: 'fulfilled', value: [...] },
//   { status: 'rejected', reason: Error },
//   { status: 'fulfilled', value: [...] }
// ]

const successful = results
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value);
```

---

## 💡 Примеры

### Пример 1: Безопасный fetch

```javascript
async function safeFetch(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { ok: true, data };

  } catch (error) {
    return { ok: false, error: error.message };
  }
}

const result = await safeFetch('/api/users');
if (result.ok) {
  console.log(result.data);
} else {
  console.log('Ошибка:', result.error);
}
```

### Пример 2: Загрузка данных для страницы

```javascript
async function loadDashboard(userId) {
  const [user, posts, notifications] = await Promise.all([
    fetchJSON(`/api/users/${userId}`),
    fetchJSON(`/api/users/${userId}/posts`),
    fetchJSON(`/api/users/${userId}/notifications`)
  ]);

  return { user, posts, notifications };
}
```

### Пример 3: Запрос с таймаутом

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

## ✏️ Задание

### Описание

Напишите функции для безопасной работы с API:

1. `fetchWithError(url)` — fetch с проверкой статуса
2. `fetchAll(urls)` — параллельная загрузка нескольких URL
3. `fetchSafe(urls)` — загрузка с обработкой частичных ошибок

### Требования

1. `fetchWithError(url)`:
   - Делает GET-запрос
   - Если `response.ok === false` — выбрасывает `Error` с текстом `"HTTP {status}"`
   - Возвращает JSON

2. `fetchAll(urls)`:
   - Принимает массив URL-адресов
   - Использует `fetchWithError` для каждого запроса
   - Загружает все **параллельно** через `Promise.all`
   - Возвращает массив результатов (JSON)
   - Если любой запрос упал — выбрасывает ошибку

3. `fetchSafe(urls)`:
   - Принимает массив URL-адресов
   - Использует `fetchWithError` для каждого запроса
   - Использует `Promise.allSettled`
   - Возвращает объект `{ succeeded: [...], failed: [...] }`
   - `succeeded` — массив успешных результатов (data)
   - `failed` — массив объектов `{ url, error }` для неудачных

### Примеры использования

```javascript
// fetchWithError
const post = await fetchWithError('https://jsonplaceholder.typicode.com/posts/1');
// { userId: 1, id: 1, title: "...", body: "..." }

await fetchWithError('https://jsonplaceholder.typicode.com/posts/9999');
// Throws: Error("HTTP 404")

// fetchAll
const posts = await fetchAll([
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
]);
// [{ id: 1, ... }, { id: 2, ... }]

// fetchSafe
const result = await fetchSafe([
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://invalid-url.test/broken'
]);
// {
//   succeeded: [{ id: 1, ... }],
//   failed: [{ url: 'https://invalid-url.test/broken', error: '...' }]
// }
```

---

## 💭 Подсказки

<details>
<summary>Подсказка 1: Направление</summary>
Ключевая идея: `fetch` не выбрасывает ошибку при HTTP 404/500 — нужно проверять `response.ok` самостоятельно. Для параллельных запросов подумайте: чем `Promise.all` отличается от `Promise.allSettled`? Какой из них «падает» при первой ошибке, а какой ждёт все результаты?
</details>

<details>
<summary>Подсказка 2: Структура</summary>

`fetchWithError`: сделайте запрос через `fetch`, проверьте `response.ok`. Если ответ неуспешный — бросьте ошибку с текстом, включающим код статуса. Если успешный — верните распарсенный JSON.

`fetchAll`: преобразуйте массив URL в массив промисов (через `.map` и `fetchWithError`) и дождитесь всех через соответствующий метод `Promise`.

</details>

<details>
<summary>Подсказка 3: Подход</summary>

`fetchSafe` должна вызвать `fetchWithError` для каждого URL и передать все промисы в `Promise.allSettled`. Каждый результат `allSettled` имеет поле `status` (`"fulfilled"` или `"rejected"`). Успешные результаты содержат данные в `value`, неудачные — ошибку в `reason`. Пройдите по результатам с `forEach`, используя `index` чтобы сопоставить каждый результат с исходным URL из массива `urls`. Нельзя использовать `.filter().map()` — после фильтрации индексы не совпадут с исходным массивом.

</details>

---

## 🧪 Как проверить решение

```bash
npx vitest module-22/index.spec.js
```

---

## 📖 Дополнительные материалы

- [MDN: Promise.all](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN: Promise.allSettled](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [JavaScript.info: Промисы](https://learn.javascript.ru/promise-api)

---

## ❓ Частые вопросы

**Q: Почему fetch не выбрасывает ошибку при 404?**

A: fetch считает ошибкой только сетевые проблемы (нет интернета, DNS не найден). HTTP 404/500 — это успешные ответы сервера, просто с кодом ошибки.

**Q: Promise.all vs Promise.allSettled — когда что использовать?**

A: `Promise.all` — когда нужны ВСЕ результаты, иначе нет смысла продолжать. `Promise.allSettled` — когда хотите получить то, что удалось, даже если часть запросов упала.

**Q: Как ограничить количество параллельных запросов?**

A: Для этого нужны специальные библиотеки (p-limit) или ручная реализация очереди. В базовом Promise.all все запросы стартуют одновременно.

---

## 🎓 Что дальше?

Переходите к **Модуль 23: Создание сервера** — научитесь создавать свой HTTP-сервер на Node.js.
