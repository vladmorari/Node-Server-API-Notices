const express = require("express");
const router = express.Router();
require("dotenv").config();

const User = require("../users/user-model");
const Notice = require("./notice-model");

router.get("/notices", async (req, res) => {
  const getAllNotices = await Notice.find().populate("userId");
  res.status(200).json(getAllNotices);
});

router.post("/notices", async (req, res) => {
  const newNotice = req.body;
  const user = await User.findById(newNotice.userId);

  if (!user) {
    return res.status(404).json({ message: "Id Not Found" });
  }

  new Notice(newNotice)
    .save()
    .then(() => {
      res.status(200).json(newNotice);
    })
    .catch((error) => {
      res.status(400).json({ message: "ERROR" });
    });
});

module.exports = router;
