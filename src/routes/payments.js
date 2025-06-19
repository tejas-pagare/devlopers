const { userAuth } = require("../middleware/auth");
const Order = require("../models/order");
const { MEMBERSHIP_AMOUNT } = require("../utils/constants");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const paymentRouter = require("express").Router();
const razorpayInstance = require("../utils/razorpay");
const User = require("../models/user");
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { firstname, lastname, emailId } = req?.user;
    if (!req?.body) throw new Error("Invalid Membership type");
    const { MembershipType } = req?.body;
    const ValidateMemberShip = ["gold", "silver"];
    if (!ValidateMemberShip.includes(MembershipType)) {
      throw new Error("Invalid Membership type");
    }

    const order = await razorpayInstance.orders.create({
      "amount": MEMBERSHIP_AMOUNT[MembershipType] * 100,
      "currency": "INR",
      "receipt": "receipt#1",
      "notes": {
        firstname,
        lastname,
        email: emailId,
        membership: MembershipType
      }
    });

    const newOrder = new Order({

      orderId: order?.id,
      userId: req?.user?._id,
      notes: order?.notes,
      currency: order?.currency,
      status: order?.status,
      amount: order?.amount,
      receipt: order?.receipt
    });

    const savedOrder = await newOrder.save();
    res.status(200).json({
      message: "Order created successfully",
      success: true,
      order: savedOrder,
      keyId: process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
});



paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const rawBody = req.body; // This is a Buffer
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    console.log(webhookSignature);
    const isValidWebhookSignature = validateWebhookSignature(JSON.stringify(rawBody), webhookSignature, secret);

    console.log(isValidWebhookSignature);
    if (!isValidWebhookSignature) throw new Error("Invalid Webhook request");

    const parsedBody = JSON.parse(rawBody.toString());
    const paymentsDetails = parsedBody?.payload?.payment?.entity;

    const Order = await Order.findOne({ orderId: paymentsDetails?.order_id });

    if (parsedBody.event === "payment.captured") {
      console.log(paymentsDetails?.id, paymentsDetails?.status, Order?.userId);
      Order.paymentId = paymentsDetails?.id;
      Order.status = paymentsDetails?.status;

      const user = await User.findOne({ _id: Order?.userId });
      user.membershipType = paymentsDetails?.notes?.membership;
      user.isPremium = true;

      const durationInMonths = paymentsDetails?.notes?.membership === "silver" ? 3 : 6;
      const validity = new Date();
      validity.setMonth(validity.getMonth() + durationInMonths);
      user.validityOfMembership = validity;

      await user.save();
      await Order.save();
    }

    res.status(200).json({
      message: "Webhook received successfully",
      success: true
    });

  } catch (error) {
    console.log("Webhook error:", error.message);
    res.status(400).json({
      message: `Error: ${error.message}`,
      success: false
    });
  }
});

paymentRouter.get("/premium/verify",userAuth,async(req,res)=>{
  try {
    const user = await User.findOne({_id:req?.user?._id});
    res.status(200).json({
      message:"Membership status",
      success:true,
      isPremium:user?.isPremium
    })
  } catch (error) {
    res.status(400).json({
      message: `Error ${error.message}`,
      success: false
    })
  }
})


module.exports = paymentRouter;