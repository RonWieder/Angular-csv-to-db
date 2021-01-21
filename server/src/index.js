"use strict";
const express = require("express");
const cors = require("cors");
const router = require("./app/routers/csv.router");

const app = express();

global.__basedir = __dirname;

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Use router module for routing the requests to server
app.use("/", router);

// Create a Server
const server = app.listen(3000, function () {
  let port = server.address().port;

  console.log("App listening at http://localhost:%s", port);
});
