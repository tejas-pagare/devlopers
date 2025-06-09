const { userAuth } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = require("express").Router();
const USER_SAFE_DATA = "firstname lastname photourl age gender bio skills";
userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requestPending = await connectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate([
      {
        path: "fromUserId",
        select: USER_SAFE_DATA
      }
    ]);
    res.status(200).json({
      message: "Pending request retrieved successfully",
      data: {
        requests: requestPending
      },
      success: true
    })
  } catch (error) {
    res.status(400).json({
      message: "Error:" + error.message,
      success: false
    })
  }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    let loggedInUserConnections = await connectionRequest.find({
      $or: [{
        toUserId: loggedInUser._id,
        status: "accepted"
      }, {
        fromUserId: loggedInUser._id,
        status: "accepted"
      }]
    }).populate([
      {
        path: "fromUserId",
        select: USER_SAFE_DATA
      }, {
        path: "toUserId",
        select: USER_SAFE_DATA
      }
    ]);
    let MyConnection = [];

    loggedInUserConnections = loggedInUserConnections.map((connection) => {
     
      if (connection?.fromUserId?._id?.toString() === loggedInUser?._id?.toString()) {

        MyConnection.push(connection.toUserId);

      } else {
        MyConnection.push(connection.fromUserId)
      }


    })
    res.status(200).json({
      message: "Connection  retrieved successfully",
      data: {
        connections: MyConnection
      },
      success: true
    })
  } catch (error) {
    res.status(400).json({
      message: "Error:" + error.message,
      success: false
    })
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const loggedInUser = req.user;
    const myConnections = await connectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser._id
        }, {
          toUserId: loggedInUser._id
        }
      ]
    }).select("fromUserId toUserId");
    const ignoreUsers = new Set();
    myConnections.map((connection) => {
      ignoreUsers.add(connection.fromUserId.toString());
      ignoreUsers.add(connection.toUserId.toString());
    });

    const myFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(ignoreUsers) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    res.status(200).json({ data: myFeed, message: "Feed retired successfully", success: true })
  } catch (error) {
    res.status(400).json({
      message: "Error:" + error.message,
      success: false
    })
  }
})

module.exports = userRouter;