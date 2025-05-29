const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref:"User"
  }, toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref:"User"
  },
  status: {
    type: String,
    enum: {
      values: ["interested", "ignored","accepted","rejected"],
      message: "Invalid request type"
    }
  }
});

connectionRequestSchema.pre("save",function (next){
  
  if(this.fromUserId.equals(this.toUserId))throw new Error("You can't send connection request to yourself");
  next();
});


// make quesry fast
connectionRequestSchema.index({fromUserId:1,toUserId:1})

const connectionRequest = mongoose.model("connectionRequest", connectionRequestSchema);
module.exports = connectionRequest;