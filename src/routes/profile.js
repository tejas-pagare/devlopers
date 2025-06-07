const { userAuth } = require("../middleware/auth");
const { editProfileValidation, changePasswordValidation } = require("../utils/validator");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const profileRouter = require("express").Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const { user } = req;
  const { firstname, lastname, bio, photourl, skills, age, emailId, gender } = user;
  try {


    res.status(200).json({
      message: "User found sucessfully",
      success: true,
      user: {
        firstname, lastname, bio, photourl, skills, age, emailId, gender
      }
    })
  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const { user } = req;

  try {
    if (!editProfileValidation(req)) throw new Error("Invalid Edit Request");
    const logedInUser = user;
    Object.keys(req.body).forEach((field) => logedInUser[field] = req.body[field]);
    await logedInUser.save();
    res.status(200).json({
      message: `${logedInUser.firstname}, your profile updated successfully`,
      success: true,
      data: logedInUser
    })

  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
})


profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const { user } = req;

  try {
    if (!changePasswordValidation(req)) throw new Error("Invalid change password Request");
    if (req.body["password"] !== req.body["confirmPassword"]) {
      res.status(401).json({
        message: "confirmPassword don't match",
        success: false
      });
      return;
    }
    Object.keys(req.body).forEach((field) => {
      if (field === "password") {
        if (!validator.isStrongPassword(req.body[field])) {
          throw new Error("Enter a strong password")
        }
      } else if (field === "confirmPassword") {
        if (!validator.isStrongPassword(req.body[field])) {
          throw new Error("Enter a strong password")
        }
      }
    });
    const newHashedPassword = await bcrypt.hash(req.body["password"], 10);
    const logedInUser = user;
    logedInUser["password"] = newHashedPassword;
    await logedInUser.save();
    res.status(200).json({
      message: `${logedInUser.firstname}, Password updated successfully`,
      success: true
    })

  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
})

module.exports = profileRouter;