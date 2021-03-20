require("dotenv").config();
const expres = require("express");
const mongosose = require("mongoose");
const server = expres();

const cookieParser = require("cookie-parser");
const usersRouterAuth = require("./auth/users-router");
const noticesRouter = require("./notices/notice-router");
const usersRouter = require("./users/user-router");

mongosose.connect(
  ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@project-dev.qpq0f.mongodb.net/Notices?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

server.use(expres.json());
server.use(cookieParser());

server.use("/", usersRouter);
server.use("/", usersRouterAuth);
server.use("/", noticesRouter);


// error middleware
server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});
module.exports = server;
