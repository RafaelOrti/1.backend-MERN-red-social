const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check if token exists
  if (!req.headers.authorization) {
    res.status(401).json({ msg: "Unauthorized access. Please, login." });
  } 
  else {
    // Check token validity
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
      if(err) {
        res.status(500).json({ msg: "Invalid token: ", err });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};