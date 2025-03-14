const http = require("http");
const sqlite3 = require("sqlite3").verbose();
const url = require("url");

const db = new sqlite3.Database("./database.db");
db.serialize(() => {
 // создать таблицу в БД, если её нет
});

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);
  //Здесь нужно указать заголовки чтобы CORS не ругался
  
  // Обработка OPTIONS-запросов (CORS)
  if (method === "OPTIONS") {
    // здесь то же сто то сделать чтобы CORS не ругался
    return;
  }

  // POST /register
  if (method === "POST" && parsedUrl.pathname === "/register") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      //Распарсить тело запроса и сохранить в базу
    });
    return;
  }

  // GET /users
  if (method === "GET" && parsedUrl.pathname === "/users") {
    // Получить всех пользователей из базы
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(3003, () => {
  console.log("Сервер запущен на порту 3003");
});
