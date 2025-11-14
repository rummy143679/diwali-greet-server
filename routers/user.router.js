var express = require("express");
const { UserModel } = require("../models/user.model");
var userRouter = express.Router();
const { isLoggedIn } = require("../middlewares/user.middlware");

userRouter.post("/createUser", (req, res) => {
  try {
    UserModel.create(req.body)
      .then((response) => {
        return res.status(201).json({
          Message: "User is created successfully",
          Status: "success",
          data: response,
        });
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({
          Message: "Something went Wrong",
          Status: `error ${error}`,
        });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ Message: "Something went Wrong", Status: `error ${error}` });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ Message: "Email and password is required", status: 401 });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!(user && (await user.comparePassword(password)))) {
      return res.status(401).json({ Message: "Email or password do not match" });
    }
    const token = await user.generateJWTToken();
    
    // set cookie value on local
    // res.cookie("token", token);

    // set cookie value on production
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // Netlify uses HTTPS
      sameSite: "None",      // REQUIRED for cross-site cookies
      path: "/",
    });

    return res.status(200).json({
      Message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ Message: "Something went Wrong", Status: `error ${error}` });
  }
});

userRouter.get("/auth", isLoggedIn, (req, res) => {
  return res.status(200).json({ status: true });
})

module.exports = { userRouter };
