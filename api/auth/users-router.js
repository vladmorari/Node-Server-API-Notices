const express = require("express");
const router = express.Router();
const User = require("../users/user-model");
const { validateUserBody, restrict } = require("./middlewares");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/users", async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

//registration user
router.post("/register", validateUserBody, async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    //verificam daca asa user nu exista deja in baza
    const user = (await User.find({ username })).length;
    if (user !== 0) {
      return res.status(409).json({
        message: "Username already taken",
      });
    }
    const newUser = await new User({
      username,
      email,
      password: await bcrypt.hash(password, 14),
    }).save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
});

// log-in user
router.post("/login", validateUserBody, async (req, res, next) => {
 
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const passwordValid = await bcrypt.compare(password, foundUser.password);
  if (!passwordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      username: foundUser.username,
      id: foundUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  );

  res.status(200).json({ message: "ok", user: username, token });
});
//logout user
router.get("/logout", (req, res) => {
  res.status(200).json({ message: "ok" });
});

router.get("/check-auth", restrict, (req, res) => {
  res.status(200).json({ message: "ok" });
});

module.exports = router;
