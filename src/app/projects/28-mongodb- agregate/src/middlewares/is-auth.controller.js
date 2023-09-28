const {verify} = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1] ?? req.headers.authorization;

    if (!token) return res.status(401).json({message: "Invalid Token"});

    verify(token, async (err, data) => {
      if (err) return res.status(401).json({message: "Invalid Token"});

      req.verify = data; // buni adminga beramiz
      next();
    });
  } catch (error) {}
};

module.exports = isAuth;
