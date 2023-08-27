const jwt = require("../utils/jwt");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({message: "Invalid Token"});

  jwt.verify(token, (err, data) => {
    if (err) return res.status(401).json({message: "Invalid Token"});

    req.user = data;
    next();
  });
};

module.exports = isAuth;
