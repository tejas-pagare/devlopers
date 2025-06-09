const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: [5, "Minimum length of firstname should be 5"],
    maxLength: [50, "Maximum Length of fistname shoud be 50"],
    trim: true
  },
  lastname: {
    type: String,
    trim: true,
    required:true
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter a valid email address")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password")
        return;
      }
    }
  },
  age: {
    type: Number,
    min: 18,
    validate(value) {
      if (!validator.isNumeric(value.toString())) {
        throw new Error("Enter a valid age");
        return;
      }
    }
  },
  gender: {
    type: String,
    validate(value) {
      // this validate function will only run when first time object is created but not during updation or deletetion in rder to ren make optionField =>{runValidator :true}
      if (!(["male", "female", "others"].includes((value.toLowerCase())))) {
        throw new Error("Enter a valid gender")
      }
    }
  },
  photourl: {
    type: String,
    default: "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
    ,
    trim: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Enter a valid url ");
        return;
      }
    }
  },
  bio: {
    type: String,
    trim: true

  },
  skills: [{
    type: String,
    trim: true
  }]
}, { timestamps: true });


userSchema.methods.getJwt = async function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET,{expiresIn:"7d"});
  return token
}
userSchema.methods.validatePassword = async function (userSendPasswprd) {
  
  const passwordCheck = await bcrypt.compare(userSendPasswprd, this.password);
  return passwordCheck
}

const User = mongoose.model("User", userSchema);
module.exports = User;