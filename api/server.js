require("dotenv").config();
const expres = require("express");
const mongosose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const server = expres();
const bodyParser = require("body-parser");
const usersRouterAuth = require("./auth/users-router");
const noticesRouter = require("./notices/notice-router");
const usersRouter = require("./users/user-router");
const cookieParser = require("cookie-parser");
mongosose.connect(
  ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@project-dev.qpq0f.mongodb.net/Notices?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
server.use(cookieParser());
server.use(bodyParser.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Hello, for API data please visit https://github.com/vladmorari/Node-Server-API-Notices  ",
  });
});
server.use("/", usersRouterAuth);
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
