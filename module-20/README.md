# Модуль 20: Формы и валидация

## 🎯 Цель модуля

Научиться собирать данные из форм и проверять их корректность перед отправкой.

---

## 📚 Теория

### Получение данных из формы

#### Через form.elements

```javascript
const form = document.querySelector('#myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Доступ по имени (атрибут name)
  const username = form.elements.username.value;
  const email = form.elements.email.value;

  // Или по индексу
  const firstField = form.elements[0].value;
});
```

#### Через FormData

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  // Получить значение
  const username = formData.get('username');

  // Все значения в объект
  const data = Object.fromEntries(formData);
  // { username: 'ivan', email: 'ivan@mail.ru' }

  // Перебор
  for (const [name, value] of formData) {
    console.log(name, value);
  }
});
```

### Типы полей формы

```html
<!-- Текст -->
<input type="text" name="username">
<input type="email" name="email">
<input type="password" name="password">
<input type="tel" name="phone">

<!-- Числа -->
<input type="number" name="age" min="0" max="120">

<!-- Чекбокс -->
<input type="checkbox" name="agree" value="yes">

<!-- Радиокнопки -->
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">

<!-- Выпадающий список -->
<select name="country">
  <option value="ru">Россия</option>
  <option value="us">США</option>
</select>

<!-- Текстовая область -->
<textarea name="message"></textarea>
```

### Получение значений разных типов

```javascript
// Текстовые поля
const text = form.elements.username.value;

// Чекбокс
const isChecked = form.elements.agree.checked;  // true/false

// Радиокнопки
const gender = form.elements.gender.value;  // выбранное значение

// Select
const country = form.elements.country.value;

// Select multiple
const options = form.elements.skills.selectedOptions;
const values = Array.from(options).map(opt => opt.value);
```

### Валидация

#### Встроенная HTML5-валидация

```html
<input type="email" required>
<input type="text" minlength="3" maxlength="20">
<input type="number" min="18" max="100">
<input type="text" pattern="[A-Za-z]+">
```

```javascript
// Проверить валидность
input.checkValidity();  // true/false

// Сообщение об ошибке
input.validationMessage;

// Проверить всю форму
form.checkValidity();
```

#### JavaScript-валидация

```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function validateForm(data) {
  const errors = {};

  if (!data.username || data.username.length < 3) {
    errors.username = 'Минимум 3 символа';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Некорректный email';
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Минимум 8 символов';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

### Показ ошибок

```javascript
function showError(input, message) {
  input.classList.add('error');
  const errorEl = document.createElement('span');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  input.parentNode.appendChild(errorEl);
}

function clearErrors(form) {
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.error-message').forEach(el => el.remove());
}
```

---

## 💡 Примеры

### Пример 1: Простая форма

```javascript
const form = document.querySelector('#login');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    username: form.elements.username.value,
    password: form.elements.password.value
  };

  console.log('Отправка:', data);
});
```

### Пример 2: Валидация в реальном времени

```javascript
const emailInput = document.querySelector('#email');

emailInput.addEventListener('input', (e) => {
  const isValid = validateEmail(e.target.value);
  emailInput.classList.toggle('valid', isValid);
  emailInput.classList.toggle('invalid', !isValid);
});
```

### Пример 3: Полная валидация формы

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors(form);

  const data = Object.fromEntries(new FormData(form));
  const { isValid, errors } = validateForm(data);

  if (!isValid) {
    Object.entries(errors).forEach(([field, message]) => {
      const input = form.elements[field];
      showError(input, message);
    });
    return;
  }

  // Форма валидна — отправляем
  submitForm(data);
});
```

---

## ✏️ Задание

### Описание

Напишите две функции для работы с формами:

1. `getFormData(selector)` — собирает данные из формы в объект
2. `validateForm(data)` — валидирует данные формы

### Требования

1. `getFormData(selector)`:
   - Находит форму по селектору
   - Возвращает объект с данными формы (используя FormData)
   - Если форма не найдена — возвращает `null`

2. `validateForm(data)`:
   - Принимает объект с полями: `username`, `email`, `password`
   - Проверяет:
     - `username`: минимум 3 символа → ошибка: `"Минимум 3 символа"`
     - `email`: содержит `@` и `.` → ошибка: `"Некорректный email"`
     - `password`: минимум 8 символов → ошибка: `"Минимум 8 символов"`
   - Возвращает объект `{ isValid: boolean, errors: object }`
   - `errors` содержит сообщения для невалидных полей (тексты должны совпадать точно)

### Примеры использования

```javascript
// Форма с полями name="username", name="email"
const data = getFormData('#register');
// { username: 'ivan', email: 'ivan@mail.ru', password: '12345678' }

const result = validateForm({
  username: 'iv',
  email: 'invalid',
  password: '123'
});
// {
//   isValid: false,
//   errors: {
//     username: 'Минимум 3 символа',
//     email: 'Некорректный email',
//     password: 'Минимум 8 символов'
//   }
// }

const result2 = validateForm({
  username: 'ivan',
  email: 'ivan@mail.ru',
  password: '12345678'
});
// { isValid: true, errors: {} }
```

---

## 💭 Подсказки

<details>
<summary>Подсказка 1: Направление</summary>
Для сбора данных формы существует встроенный класс `FormData`. Как превратить его в обычный объект? А для валидации подумайте: какие два символа обязательно должны быть в email?
</details>

<details>
<summary>Подсказка 2: Структура</summary>

Для сбора данных формы используйте конструктор `FormData`, передав ему найденный элемент формы. Чтобы превратить `FormData` в обычный объект, есть удобный статический метод `Object.fromEntries()`. Для валидации создайте пустой объект ошибок и последовательно проверяйте каждое поле.

</details>

<details>
<summary>Подсказка 3: Подход</summary>

Для `getFormData` — найдите форму по селектору, верните `null` если не найдена, иначе создайте `new FormData(form)` и сконвертируйте в обычный объект через `Object.fromEntries()`. Для `validateForm` — создайте пустой объект `errors`, затем проверьте каждое поле: `username` должен существовать и иметь длину не менее 3 символов, `email` должен содержать символы `@` и `.`, `password` должен иметь длину не менее 8 символов. Для каждой неудачной проверки добавляйте в `errors` запись с сообщением. В конце определите `isValid` — проверьте, пуст ли объект ошибок (через `Object.keys(errors).length`). Тексты ошибок должны точно совпадать с тем, что ожидают тесты.

</details>

---

## 🧪 Как проверить решение

```bash
npx vitest module-20/index.spec.js
```

Также откройте `index.html` для интерактивного тестирования.

---

## 📖 Дополнительные материалы

- [MDN: FormData](https://developer.mozilla.org/ru/docs/Web/API/FormData)
- [JavaScript.info: Формы](https://learn.javascript.ru/forms-controls)

---

## ❓ Частые вопросы

**Q: FormData vs form.elements — что лучше?**

A: `FormData` удобнее для отправки на сервер и конвертации в объект. `form.elements` даёт прямой доступ к элементам.

**Q: Как валидировать email по-настоящему?**

A: Проверка `includes('@')` — базовая. Для серьёзной валидации используйте regex или отправьте письмо с подтверждением.

**Q: Когда валидировать — при вводе или при отправке?**

A: При вводе (`input`) — для мгновенной обратной связи. При отправке (`submit`) — финальная проверка перед отправкой на сервер.

---

## 🎓 Что дальше?

Блок 5 (HTML и DOM) завершён! Переходите к **Модуль 21: HTTP** — узнаете как браузер общается с сервером.
