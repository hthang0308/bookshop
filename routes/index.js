const express = require("express");

const booksRouter = require("./book");
const usersRouter = require("./user");
const purchasingRouter = require("./purchasing");

const routes = (app) => {
  // for form
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  // for axios
  app.use(express.json());
  app.use("/api/book", booksRouter);
  app.use("/api/user", usersRouter);
  app.use("/api/purchasing", purchasingRouter);
};

module.exports = routes;
