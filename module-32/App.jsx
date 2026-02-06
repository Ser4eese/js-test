/**
 * Модуль 32: Финальный проект — Frontend (React)
 *
 * Задание: Компоненты для приложения заметок.
 */

import { useState, useEffect } from 'react';

/**
 * NoteList — список заметок
 *
 * @param {Object} props
 * @param {Array} props.notes - массив заметок { id, title, text }
 *
 * Рендерит <ul data-testid="note-list">
 * Каждая заметка: <li data-testid="note-item"> с <h3>title</h3> и <p>text</p>
 */
export function NoteList({ notes }) {
  // Ваш код здесь
}

/**
 * AddNoteForm — форма добавления заметки
 *
 * @param {Object} props
 * @param {Function} props.onAdd - колбэк onAdd({ title, text })
 *
 * Два input: placeholder="Заголовок" и placeholder="Текст заметки"
 * При сабмите: вызвать onAdd, очистить поля
 */
export function AddNoteForm({ onAdd }) {
  // Ваш код здесь
}

/**
 * App — главный компонент
 *
 * @param {Object} props
 * @param {string} props.url - базовый URL сервера
 *
 * При монтировании: GET {url}/api/notes
 * Загрузка: <p data-testid="loading">Загрузка...</p>
 * Содержит AddNoteForm + NoteList
 * При добавлении: POST {url}/api/notes, обновить список
 */
export function App({ url }) {
  // Ваш код здесь
}
