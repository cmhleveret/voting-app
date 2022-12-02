const express = require("express");
const userRouter = express.Router();
const user = require("../controllers/userController")

userRouter.post("/auth", user.login);
userRouter.post("/newUser", user.signup);


module.exports = userRouter;