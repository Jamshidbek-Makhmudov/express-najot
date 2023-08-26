const jwt = require("jsonwebtoken");
const config = require("../../config");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({message: "Invalid Token"});

  jwt.verify(token, config.jwtSecretKey, (err, data) => {
    if (err) return res.status(401).json({message: "Invalid Token"});
    req.userId = data.id;
    next();
  });
};

module.exports = isAuth;
