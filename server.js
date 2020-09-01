let express = require("express"),
  app = express(),
  http = require("http"),
  bodyParser = require("body-parser"),
  server = http.createServer(app);

const NodeCache = require("node-cache");
const myCache = new NodeCache();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", function (request, response, next) {
  response.send("test - ok!");
});

app.get("/add", function (request, response, next) {
  const val = Math.random();
  // const ttl = undefined; //TTL in Seconds
  const ttl = 10; //TTL in 10 Seconds
  myCache.set("test", val, ttl || null);
  response.send("added");
});

app.get("/get", function (request, response, next) {
  const data = myCache.get("test");
  console.log("data", data);
  response.send("reques-ok!");
});

app.get("*", function (req, response) {
  res.send("HELLO");
});

server.listen(3000, function () {
  console.log("Express TestServer Started on port 3000");
});
