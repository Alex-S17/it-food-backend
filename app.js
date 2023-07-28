const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { errorHandler } = require("./helpers/errorHandler");

const {
  dishRouter,
  authRouter,
  userRouter,
  userOrder,
} = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/dishes", dishRouter);

app.use("/api/users/", authRouter, userRouter);
app.use("/api/order/", userOrder);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
