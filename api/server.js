require("dotenv").config();
const expres = require("express");
const mongosose = require("mongoose");
const server = expres();
const usersRouter = require("./auth/users-router");
const noticesRouter = require("./notices/notice-router");
mongosose.connect(
  ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@project-dev.qpq0f.mongodb.net/Notices?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

server.use(expres.json());
server.use("/", usersRouter);
server.use("/", noticesRouter);

// error middleware
server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});
module.exports = server;
