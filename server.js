let express = require("express"),
  app = express(),
  http = require("http"),
  bodyParser = require("body-parser"),
  server = http.createServer(app);

const NodeCache = require("node-cache");
const myCache = new NodeCache();

myCache.on("expired", function (key, value) {
  myCache.del(key);
});

getValues = () => {
  const keys = myCache.keys();

  console.log("KEYS:", keys);

  keys.forEach((key) =>
    console.log(
      "key:",
      key,
      " value:",
      myCache.get(key),
      " ttl:",
      myCache.getTtl(key)
    )
  );

  // console.log("VALUE", myCache.get());
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", function (request, response, next) {
  response.send("test - ok!");
});

app.get("/add", function (request, response, next) {
  const key = Math.random();
  const value = Math.random();
  const ttl = undefined; //TTL in Seconds
  // const ttl = 10; //TTL in 10 Seconds
  // myCache.set(key, val, ttl || null);
  myCache.set(key, value);
  myCache.ttl(key, ttl || null);
  response.send("added:" + key);
});

app.get("/get", function (request, response, next) {
  getValues();
  response.send("reques-ok!");
});

app.get("*", function (req, response) {
  response.send("HELLO");
});

server.listen(3000, function () {
  console.log("Express TestServer Started on port 3000");
});
