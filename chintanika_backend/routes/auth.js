const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../models/middleware/fetchUser");
//to check if someone tempers the userid sent to get token
const JWT_SECRET = "ChaseYourStarsFoolLifeIsShort";

//ROUTE 1-create a user using: post "/api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("name", "name length should be minimum 5").isLength({ min: 5 }),
    body("email", "email format ->name@test.com").isEmail(),
    body("password", "password length must be greater than 5").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there are error -->return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //check if user with same email exists await for promise
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry, a user with this email already exists",
          });
      }
      //generate salt
      const salt = await bcrypt.genSalt(10);
      //bcrypt.hash returns a promise so await
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        image: req.body.image, //added
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//ROUTE-2 authenticate user: post "/api/auth/login". no login required (endpoint login)
router.post(
  "/login",
  [
    //if email is wrong or password is empty we wont touch the server
    body("email", "email format ->name@test.com").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are error -->return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //otherwise get email or password from request body
    const { email, password } = req.body;

    try {
      //find the user in User model
      let user = await User.findOne({ email });
      //if user doesnot exists return user does not exists
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Login with correct credentials" });
      }

      //otherwise compare paswword entered by user with password in the table using bcrypt
      const passwordCompare = await bcrypt.compare(password, user.password);
      //if wrong password
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Login with correct credentials" });
      }
      //else send authToken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(400).json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE-3 get user details: post "/api/auth/getuser".Login required (endpoint getuser)
router.post("/getuser", fetchUser, async (req, res) => {
  //middleware function fetchUser is called whenever login required endpoints receive any requests
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const allusers = await User.find({});
    res.send({ data: allusers });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
