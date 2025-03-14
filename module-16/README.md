# Query-параметры

Создайте сервер, который:
1. При GET-запросе на `/search` извлекает параметр `query` из URL.
2. Возвращает "Search results for: [query]".
   - Пример: `/search?query=nodejs` → "Search results for: nodejs".
3. Если параметр `query` отсутствует → "Please provide a query".