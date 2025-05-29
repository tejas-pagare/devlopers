const mongoose = require("mongoose");
const connectDatabase = async()=>{
  try {
    //mongodb://localhost:27017
    //mongodb+srv://tejaspagare1625:tejas1625@cluster0.kgaj6d0.mongodb.net/
   await mongoose.connect("mongodb://localhost:27017/Meet");
   
  } catch (error) {
    console.log(error)
    console.log("Error in connecting to database!");
    process.exit(1);
  }
}

module.exports = { connectDatabase};