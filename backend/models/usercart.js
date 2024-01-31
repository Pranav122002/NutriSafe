const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserItem",
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;