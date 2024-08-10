const jwt = require("jsonwebtoken");
const logon = async (req, res) => {
  // res.send("logon working")
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ msg: "Missing name or password" });
  }

  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({ msg: "user created", token });
};

const hello = async (req, res) => {
  res.status(200).json({
    message: `Hello, ${req.user.name}`,
  });
};

module.exports = {
  logon,
  hello,
};
