const express = require("express");
const router = express.Router();
const { restrict } = require("../auth/middlewares");
require("dotenv").config();

const User = require("../users/user-model");
const Notice = require("./notice-model");
//obtinem toate notitele unui user
router.get("/notices", restrict, async (req, res, next) => {
  try {
    const getAllNotices = await Notice.find({
      userId: req.decoded.id,
    }).populate("userId"); //caut toate notitele dupa user id si le populez cu datele utilizatorului ce lea postat

    res.status(200).json(getAllNotices);
  } catch (err) {
    next(err);
  }
});
//postam notita
router.post("/notices", restrict, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const user = req.decoded.id;
    const addNote = await new Notice({ title, content, userId: user }).save();
    res.status(201).json(addNote);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
