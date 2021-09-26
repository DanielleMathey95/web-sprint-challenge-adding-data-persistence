// build your server here and require it from index.js
const express = require("express");

const ProjectRouter = require("./project/router");
const ResourceRouter = require("./resource/router");
const TaskRouter = require("./task/router");

const server = express();

server.use(express.json());
server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);
server.use("/api/tasks", TaskRouter);

//CATCH ALL
server.use("*", (req, res, next) => {
  next({ status: 404, message: "not found" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = server;
