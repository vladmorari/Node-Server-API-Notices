const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: String,
  password: { type: "String", require: true },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
