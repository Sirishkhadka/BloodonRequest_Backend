const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const requestRouter = require("./routes/requests");
const dotenv = require("dotenv").config();
const uploadRouter = require("./routes/upload");
const auth = require("./auth");
const cors = require("cors");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    (db) => {
      console.log("Successfully connected to MongodB server");
    },
    (err) => console.log(err)
  );

app.use("/users", userRouter);
app.use("/upload", uploadRouter);
//app.use(auth.verifyUser);
app.use("/requests", requestRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});

var server = app.listen(process.env.PORT);

module.exports = server;
