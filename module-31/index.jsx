/**
 * Модуль 31: React + Fetch
 *
 * Задание: Создайте компоненты, которые работают с API.
 */

import { useState, useEffect } from 'react';

/**
 * PostList — загружает и отображает список постов
 *
 * @param {Object} props
 * @param {string} props.url - базовый URL API
 *
 * Состояния:
 * - Загрузка: <p data-testid="loading">Загрузка...</p>
 * - Ошибка:   <p data-testid="error">Ошибка: {message}</p>
 * - Данные:   <ul data-testid="posts"><li>{title}</li>...</ul>
 */
export function PostList({ url }) {
  // Ваш код здесь
}

/**
 * AddPostForm — форма для создания поста
 *
 * @param {Object} props
 * @param {string} props.url - базовый URL API
 * @param {Function} props.onAdd - колбэк после создания поста
 *
 * При сабмите:
 * - POST {url}/api/posts с body { title }
 * - Вызвать onAdd(newPost)
 * - Очистить input
 */
export function AddPostForm({ url, onAdd }) {
  // Ваш код здесь
}
