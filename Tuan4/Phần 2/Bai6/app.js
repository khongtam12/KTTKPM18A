const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Hello Multi-stage Docker!");
});

server.listen(3000, "0.0.0.0");