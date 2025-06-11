const { userAuth } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const sendEmail = require("../utils/sendEmails")
const User = require("../models/user");

const requestRouter = require("express").Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const { status } = req.params;
    const toUserId = req.params.userId;
    const fromUserId = req.user._id;

    const ALLOWED_STATUS = ["interested", "ignored"];
    const isAllowedStatus = ALLOWED_STATUS.includes(status);
    if (!isAllowedStatus) throw new Error(`Invalid status type: ${status}`);
    const toUser = await User.findById(toUserId);
    if (!toUser) throw new Error("User don't Exists");

    // check already request exists from fromUserId to toUserId and vice versa

    const isRequestExist = await connectionRequest.findOne({
      $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }]
    });
    if (isRequestExist) throw new Error(`Connection request already exist between ${req.user.firstname} and ${toUser.firstname}`);

    const newConnectionRequest = new connectionRequest({ fromUserId, toUserId: toUser._id, status });
    await newConnectionRequest.save();
    if (!(status === "interested")) {

      await sendEmail.run("Connection Request send", `${req.user.firstname}  ${status}  ${toUser.firstname}`);
    } else {
      await sendEmail.run("Connection Request send", `${req.user.firstname} is ${status} in ${toUser.firstname}`);
    }

    return res.status(200).json({
      message: `Request send successfully`,
      success: true,
      request: newConnectionRequest
    })

  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }

})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const { status, requestId } = req.params;

    const ALLOWED_STATUS = ["accepted", "rejected"];
    const isAllowedStatus = ALLOWED_STATUS.includes(status);
    if (!isAllowedStatus) throw new Error(`Invalid status type: ${status}`);
    const loggedInUser = req.user;

    const isRequestExist = await connectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    });
    if (!isRequestExist) throw new Error(`Connection request don't  Exist`);
    isRequestExist.status = status;

    await isRequestExist.save()
    return res.status(200).json({
      message: `Request ${status} successfully`,
      success: true,
      request: isRequestExist
    })

  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }

})
module.exports = requestRouter;