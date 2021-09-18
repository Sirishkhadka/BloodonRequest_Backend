const http = require("http");

const app = require("./index");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const test = server.listen(port);

module.exports = test;
