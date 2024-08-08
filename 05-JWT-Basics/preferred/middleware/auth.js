const jwt = require("jsonwebtoken");

// This checks the Authorization header
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "what happen" });
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const { name } = decoded; //Extract user's name from the token payload
    req.user = { name }; //store user's name in req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = authenticationMiddleware;
