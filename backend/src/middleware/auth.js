const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {

  try {
    const token = req?.cookies?.token;
    if (!token){
      return res.status(401).json({
        message:"Invalid Token ",
        success:false
      })
    };
    const { userId } = jwt.decode(token);

    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        message: "User not found",
        success: false,
        user: null
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
}

module.exports = {
  userAuth
}