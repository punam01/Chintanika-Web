var jwt = require("jsonwebtoken");

//to check if someone tempers the userid sent to get token
JWT_SECRET = "ChaseYourStarsFoolLifeIsShort";
//middleware is a function which takes argu as request response and next
const fetchUser = (req, res, next) => {
  //get user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};
module.exports = fetchUser;
