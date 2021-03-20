const express = require("express");
const router = express.Router();
const User = require("../users/user-model");
const { restrict } = require("../auth/middlewares");

//delete user
router.delete("/users/:userId", restrict, async (req, res, next) => {
  try {
    await User.findOneAndDelete({
      _id: req.decoded.id,
    }).exec();
    res.clearCookie("token");
    res.status(201).json({ message: "ok" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
