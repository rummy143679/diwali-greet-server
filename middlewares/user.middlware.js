var jwt = require("jsonwebtoken");
const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized"
    });
  }
  const decoded = await jwt.verify(token, process.env.JWT_KEY);
  if (!decoded) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized"
    });
  }
  next();
};

module.exports = { isLoggedIn };
