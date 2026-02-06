# Модуль 18: DOM (Document Object Model)

## 🎯 Цель модуля

Научиться находить и изменять элементы на веб-странице с помощью JavaScript.

---

## 📚 Теория

### Что такое DOM?

**DOM** (Document Object Model) — это представление HTML-документа в виде дерева объектов. JavaScript может читать и изменять это дерево, тем самым меняя страницу.

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        ├── p
        └── div
            └── button
```

### Поиск элементов

#### querySelector — найти один элемент

```javascript
// По тегу
const header = document.querySelector('h1');

// По классу
const card = document.querySelector('.card');

// По id
const menu = document.querySelector('#menu');

// По атрибуту
const input = document.querySelector('input[type="email"]');

// Вложенный селектор
const link = document.querySelector('nav a.active');
```

#### querySelectorAll — найти все элементы

```javascript
const items = document.querySelectorAll('li');
const buttons = document.querySelectorAll('.btn');

// Возвращает NodeList (похож на массив)
items.forEach(item => console.log(item));
```

#### Старые методы (тоже работают)

```javascript
document.getElementById('menu');           // по id
document.getElementsByClassName('card');   // по классу (HTMLCollection)
document.getElementsByTagName('p');        // по тегу (HTMLCollection)
```

### Изменение содержимого

```javascript
const title = document.querySelector('h1');

// Текст (безопасно)
title.textContent = 'Новый заголовок';

// HTML (осторожно с пользовательским вводом!)
title.innerHTML = '<span>Новый</span> заголовок';
```

### Изменение атрибутов

```javascript
const link = document.querySelector('a');
const input = document.querySelector('input');

// Получить атрибут
const href = link.getAttribute('href');

// Установить атрибут
link.setAttribute('href', 'https://google.com');
input.setAttribute('disabled', 'true');

// Удалить атрибут
input.removeAttribute('disabled');

// Прямой доступ к некоторым атрибутам
link.href = 'https://google.com';
input.value = 'Новое значение';
input.disabled = true;
```

### Изменение стилей

```javascript
const box = document.querySelector('.box');

// Inline-стили
box.style.backgroundColor = 'red';
box.style.fontSize = '20px';
box.style.display = 'none';

// Работа с классами (предпочтительно!)
box.classList.add('active');
box.classList.remove('hidden');
box.classList.toggle('visible');
box.classList.contains('active');  // true/false
```

### Создание и добавление элементов

```javascript
// Создать элемент
const div = document.createElement('div');
div.textContent = 'Привет!';
div.classList.add('message');

// Добавить в конец родителя
document.body.appendChild(div);

// Добавить в начало
parent.prepend(div);

// Вставить перед элементом
parent.insertBefore(newElement, existingElement);

// Удалить элемент
div.remove();
```

### Навигация по DOM

```javascript
const element = document.querySelector('.item');

// Родитель
element.parentElement;

// Дети
element.children;           // HTMLCollection
element.firstElementChild;
element.lastElementChild;

// Соседи
element.nextElementSibling;
element.previousElementSibling;
```

---

## 💡 Примеры

### Пример 1: Изменение текста

```javascript
// HTML: <h1 id="title">Старый заголовок</h1>
const title = document.querySelector('#title');
title.textContent = 'Новый заголовок';
```

### Пример 2: Переключение класса

```javascript
// HTML: <div class="menu"></div>
const menu = document.querySelector('.menu');
menu.classList.toggle('open');
// Результат: <div class="menu open"></div> или обратно
```

### Пример 3: Создание списка

```javascript
const ul = document.querySelector('ul');
const items = ['Яблоко', 'Банан', 'Апельсин'];

items.forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
});
```

### Пример 4: Получение значения из формы

```javascript
const input = document.querySelector('#username');
const value = input.value;
console.log('Введено:', value);
```

---

## ✏️ Задание

### Описание

Напишите три функции для работы с DOM:

1. `getElementText(selector)` — возвращает текстовое содержимое элемента
2. `setElementText(selector, text)` — устанавливает текст элемента
3. `toggleClass(selector, className)` — переключает класс у элемента

### Требования

1. `getElementText(selector)`:
   - Находит элемент по селектору
   - Возвращает его `textContent`
   - Если элемент не найден — возвращает `null`

2. `setElementText(selector, text)`:
   - Находит элемент по селектору
   - Устанавливает `textContent`
   - Возвращает `true` если успешно, `false` если элемент не найден

3. `toggleClass(selector, className)`:
   - Находит элемент по селектору
   - Переключает указанный класс (add/remove)
   - Возвращает `true` если класс добавлен, `false` если удалён, `null` если элемент не найден

### Примеры использования

```javascript
// HTML: <h1 id="title">Привет</h1>
getElementText('#title');  // 'Привет'

setElementText('#title', 'Пока');  // true
// HTML: <h1 id="title">Пока</h1>

// HTML: <div class="box"></div>
toggleClass('.box', 'active');  // true (класс добавлен)
// HTML: <div class="box active"></div>

toggleClass('.box', 'active');  // false (класс удалён)
// HTML: <div class="box"></div>
```

---

## 💭 Подсказки

<details>
<summary>Подсказка 1: Направление</summary>
Все три функции начинаются одинаково: найти элемент и проверить, существует ли он. Что должна вернуть функция, если элемент не найден? Подумайте, какой метод DOM ищет элемент по CSS-селектору.
</details>

<details>
<summary>Подсказка 2: Структура</summary>

Каждая функция начинается одинаково: найти элемент через `document.querySelector`, проверить, не `null` ли результат, и если элемент не найден — вернуть специальное значение. Для работы с классами вспомните, что у каждого DOM-элемента есть свойство `classList` с удобными методами.

</details>

<details>
<summary>Подсказка 3: Подход</summary>

Для `getElementText` — найдите элемент, верните `null` если не найден, иначе верните его `textContent`. Для `setElementText` — аналогично найдите элемент, если не найден верните `false`, иначе установите `textContent` и верните `true`. Для `toggleClass` — найдите элемент, если не найден верните `null`, иначе вызовите `classList.toggle()` с именем класса. Обратите внимание, что `classList.toggle()` сам возвращает булево значение, которое можно использовать напрямую как результат функции.

</details>

---

## 🧪 Как проверить решение

```bash
npx vitest module-18/index.spec.js
```

Также откройте `index.html` в браузере и используйте кнопки для тестирования.

---

## 📖 Дополнительные материалы

- [MDN: Document Object Model](https://developer.mozilla.org/ru/docs/Web/API/Document_Object_Model)
- [JavaScript.info: DOM](https://learn.javascript.ru/document)

---

## ❓ Частые вопросы

**Q: Чем отличается textContent от innerHTML?**

A: `textContent` — только текст (безопасно). `innerHTML` — HTML-разметка (опасно для пользовательского ввода, XSS-атаки).

**Q: querySelector vs getElementById — что лучше?**

A: `querySelector` универсальнее (любой CSS-селектор). `getElementById` чуть быстрее, но только для id.

**Q: Почему classList лучше чем style?**

A: Стили должны быть в CSS. JavaScript только переключает классы. Это разделение ответственности и проще поддерживать.

---

## 🎓 Что дальше?

После выполнения переходите к **Модуль 19: События** — научитесь реагировать на действия пользователя.
