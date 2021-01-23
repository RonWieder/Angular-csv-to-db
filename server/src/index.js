const express = require("express");
var logger = require("morgan");
const cors = require("cors");

global.__basedir = __dirname;

const app = express();
app.use(logger("dev"));

// Setting and using cors to explicitly allow calls from angular web server
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Use router module for routing the calls to server
const router = require("./app/routers/router");
app.use("/", router);

// Create a Server
const server = app.listen(3000, function () {
  let port = server.address().port;

  console.log("App listening at http://localhost:%s", port);
});
