var express = require("express");
const { sequelize } = require("./models");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var companiesRoute = require("./routes/companies");
var tasksRoute = require("./routes/tasks");
var listRoute = require("./routes/lists");

async function main() {
  await sequelize.authenticate();
  // console.log("Starting server...");

  // sequelize.sync({ alter: true, drop: true });
  // sequelize.sync({ force: true });
}
main();
// console.log("this is executed before sequelize");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/companies", companiesRoute);
app.use("/tasks", tasksRoute);
app.use("/lists", listRoute);

module.exports = app;
