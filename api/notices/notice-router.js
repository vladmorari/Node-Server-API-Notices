const express = require("express");
const router = express.Router();
const { restrict } = require("../auth/middlewares");
require("dotenv").config();

const Notice = require("./notice-model");
//obtinem toate notitele unui user
router.get("/notices", restrict, async (req, res, next) => {
  try {
    const getAllNotices = await Notice.find({
      userId: req.decoded.id,
    }).populate("userId"); //caut toate notitele dupa user id si le populez cu datele utilizatorului

    res.status(200).json(getAllNotices);
  } catch (err) {
    next(err);
  }
});
//postam notita
router.post("/notices", restrict, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    // const user = req.decoded.id;

    const addNote = await new Notice({
      title,
      content,
      userId: req.decoded.id,
    }).save();
    res.status(201).json(addNote);
  } catch (err) {
    next(err);
  }
});
//obtinem doar cate o notita dupa id
router.get("/notices/:noteId", restrict, async (req, res, next) => {
  try {
    const foundNote = await Notice.findOne({
      _id: req.params.noteId,
      userId: req.decoded.id,
    }).exec();
    if (!foundNote) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(foundNote);
  } catch (error) {
    next(error);
  }
});
//editez o notita
router.put("/notices/:noteId", restrict, async (req, res, next) => {
  try {
    await Notice.findOneAndUpdate(
      {
        _id: req.params.noteId,
        userId: req.decoded.id,
      },
      {
        title: req.body.title,
        content: req.body.content,
      }
    );
    res.status(201).json({ message: "ok" });
  } catch (error) {
    next(error);
  }
});

router.delete("/notices/:noteId", restrict, async (req, res, next) => {
  try {
    await Notice.findOneAndDelete({
      _id: req.params.noteId,
      userId: req.decoded.id,
    }).exec();
    res.status(201).json({ message: "ok" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
