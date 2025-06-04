const validator = require("validator");

const SignUpValidator = ({ emailId, password, lastname, firstname }) => {
  if (!firstname) {
    throw new Error("Enter a valid firstname");
  } else if (!lastname) {
    throw new Error("Enter a valid lastname");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid EmailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
}

const editProfileValidation = (req) => {
  const ALLOWED_UPDATES_FIELDS = ["lastname", "firstname", "bio", "skills", "emailId", "age", "gender","photourl"];
  const isAllowedEdit = Object.keys(req.body).every((field) => ALLOWED_UPDATES_FIELDS.includes(field));
  Object.keys(req.body).every((field) => {
    if (field === "emailId") {
      if (!validator.isEmail(req.body[field])) throw new Error("Enter a valid email");
    } else if (field === "firstname") {
      if (req.body[field].length < 5 || req.body[field].length > 50) {
        throw new Error("firstname must have length between 5 and 50")
      }
    } else if (field === "bio") {
      if (req.body[field].length() < 100) {
        throw new Error("firstname must have length between less than 100")
      }
    } else if (field === "age") {
      if (req.body[field] < 18) {
        throw new Error("Age must be 18+")
      }
    } else if (field === "gender") {
      if (!(req.body[field] === "male" || req.body[field] === "female" || req.body[field] === "other")) {
        throw new Error("Enter a valid gender")
      }
    }else if(field==="photourl"){
      if(!validator.isURL(req.body[field])){
        throw new Error("Enter a valid image url");
      }
    }
  });

  return isAllowedEdit;
}

const changePasswordValidation = (req)=>{
  const ALLOWED_FIELDS = ["password","confirmPassword"];
  const isAllowedCheck = Object.keys(req.body).every((field)=>ALLOWED_FIELDS.includes(field));
  
  return isAllowedCheck;
  

}
module.exports = { SignUpValidator, editProfileValidation,changePasswordValidation }