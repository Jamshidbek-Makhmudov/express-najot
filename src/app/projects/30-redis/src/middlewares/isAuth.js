const {verify} = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] ?? req.headers.authorization;

    if (!token) res.status(401).json({message: "Invalid Token"});

    verify(token, (err, data) => {
      if (err) return res.status(401).json({message: "Invalid Token"});

      req.user = data;
      next();
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = isAuth;
