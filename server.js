let express = require("express"),
  app = express(),
  http = require("http"),
  bodyParser = require("body-parser"),
  server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", function (request, response, next) {
  response.send("test - ok!");
});

app.get("*", function (req, res) {
  res.send("HELLO");
});

server.listen(3000, function () {
  console.log("Express TestServer Started on port 3000");
});
