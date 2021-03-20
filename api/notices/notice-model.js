const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

const notice = mongoose.model("Notice", noticeSchema);
module.exports = notice;
