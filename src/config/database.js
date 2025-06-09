const mongoose = require("mongoose");
const connectDatabase = async()=>{
  try {
    //mongodb://localhost:27017
    
   await mongoose.connect(process.env.DB_CONNECTION_URL);
   
  } catch (error) {
    console.log(error)
    console.log("Error in connecting to database!");
    process.exit(1);
  }
}

module.exports = { connectDatabase};