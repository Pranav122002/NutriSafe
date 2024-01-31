const mongoose = require("mongoose");

const userItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const userItemModel = mongoose.model("UserItem", userItemSchema);

module.exports = userItemModel;