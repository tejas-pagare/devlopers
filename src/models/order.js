const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  paymentId: {
    type: String
  },
  orderId: {
    type: String,
    req: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    req:true
    
  },
  notes: {
    email: {
      type: String,
      req: true
    },
    firstname: {
      type: String,
      req: true
    },
    lastname: {
      type: String
    },
    membership: {
      type: String,
      req: true
    }

  },
  currency: {
    type: String
  },
  status: {
    type: String
  },
  amount: {
    type: Number
  },
  receipt: {
    type: String
  }
});

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;