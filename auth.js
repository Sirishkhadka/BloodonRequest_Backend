const jwt = require("jsonwebtoken");
const User = require("./models/users");

module.exports.verifyUser = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Bearer token not provided" });
    return;
  }
  let token = authHeader.split(" ")[1];
  let data;
  try {
    data = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    res.status(402).json({ message: "Token could not be verified" });
  }
  User.findById(data._id).then((user) => {
    req.user = user;
    next();
  });
};
module.exports.verifyAdmin = (req, res, next) => {
  if (!req.user) {
    let err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }
  if (req.user.admin !== true) {
    let err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
  next();
};
