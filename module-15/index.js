const http = require("http");

const server = http.createServer((req, res) => {
  const { url } = req;
  res.setHeader("Content-Type", "text/plain")
  // Пишем маршрутизацию тут
});

server.listen(3001);