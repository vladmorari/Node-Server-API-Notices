const jwt = require("jsonwebtoken");

const validateUserBody = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username or password invalid" });
  }
  next();
};

const restrict = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //verificam daca tokenu coincide cu cel din cookies
    if (err) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.decoded = decoded; // intoarce datele decodate din cookie token
    next();
  });
};

module.exports = { validateUserBody, restrict };
