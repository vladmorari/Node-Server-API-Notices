const validateUserBody = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Email or password invalid" });
  }
  next();
};
module.exports = validateUserBody;
