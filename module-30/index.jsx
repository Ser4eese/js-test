/**
 * Модуль 30: Введение в React
 *
 * Задание: Создайте три компонента: Greeting, Counter, TodoList.
 */

import { useState } from 'react';

/**
 * Greeting — компонент приветствия
 *
 * @param {Object} props
 * @param {string} props.name - имя (если пустое — "мир")
 * @returns {JSX.Element} - <h1>Привет, {name}!</h1>
 */
export function Greeting({ name }) {
  // Ваш код здесь
}

/**
 * Counter — компонент счётчика
 *
 * @param {Object} props
 * @param {number} props.initial - начальное значение (по умолчанию 0)
 * @returns {JSX.Element}
 *
 * Элементы:
 * - <span data-testid="count"> — текущее значение
 * - <button data-testid="increment"> — +1
 * - <button data-testid="decrement"> — -1
 * - <button data-testid="reset"> — сброс к initial
 */
export function Counter({ initial = 0 }) {
  // Ваш код здесь
}

/**
 * TodoList — компонент списка задач
 *
 * @param {Object} props
 * @param {string[]} props.items - массив строк-задач
 * @returns {JSX.Element}
 *
 * Если items пустой → <p>Нет задач</p>
 * Иначе → <ul> с <li> для каждого элемента
 */
export function TodoList({ items }) {
  // Ваш код здесь
}
