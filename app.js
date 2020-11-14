const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require("./api/Routes/user");
const repairRoutes = require("./api/Routes/repair");
const testRoutes = require("./api/Routes/test");

app.use("/user", userRoutes);
app.use("/repair", repairRoutes);
app.use("/test", testRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
