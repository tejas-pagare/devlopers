const User = require("../models/user");
const { SignUpValidator } = require("../utils/validator");
const bcrypt = require("bcryptjs")
const authRouter = require("express").Router();


authRouter.post("/signup", async (req, res) => {
  try {
    const ALLOWED_UPDATES = ["firstname", "emailId", "password", "lastname"];
    const isUpdateAllowed = Object.keys(req.body).every((k) => ALLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
      throw new Error("Ivalid Credentails")
    }

    // validating the data
    SignUpValidator(req.body);

    // check dulpicate user
    const userCheck = await User.findOne({ emailId: req.body.emailId });
    if (userCheck) return res.status(402).json({
      message: "User already exits",
      success: false
    });
    const { password, lastname, firstname, emailId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      emailId,
      password: hashedPassword
    })
    await user.save();
    res.status(200).json({
      message: "User created successfully",
      success: true
    })
  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const ALLOWED_UPDATES = ["emailId", "password"];
    const isUpdateAllowed = Object.keys(req.body).every((k) => ALLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
      throw new Error("Ivalid Credentails")
    }
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid Credentails");
    const passwordCheck = await user.validatePassword(password);
    if (!passwordCheck) throw new Error("Invalid Credetails");
    else {
      // create a token 
      const token = await user.getJwt();
      // set the cookie
      res.cookie("token", token,{httpOnly:true,expires:new Date(Date.now()+ 7*3600000)});
      res.status(200).json({
        message: "Login sucessfully",
        success: true,
        user
      })
      return;
    }
  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
});

authRouter.post("/logout",(req,res)=>{
res.cookie("token","",{expires:new Date(Date.now())}).status(200).json({
  message:`Logout sucessfully`,
  success:true
})
})


module.exports = authRouter;