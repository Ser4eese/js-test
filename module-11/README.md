# Базовый Promise

Напишите функцию `createPromise`, которая:
1. Возвращает промис, резолвящийся через 1 секунду со строкой "Promise resolved!".
2. Если входной параметр `success` равен `false`, промис должен быть отклонен с ошибкой "Promise rejected!".