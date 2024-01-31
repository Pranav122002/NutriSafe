// user.js (updated)
const mongoose = require("mongoose");
const cartModel = require("./usercart"); // Adjust the path accordingly

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
});

userSchema.pre("save", async function (next) {
  // Create a cart for the user when a new user is created
  if (!this.cart) {
    const cart = new cartModel();
    await cart.save();
    this.cart = cart._id;
  }
  next();
});

const userModel = mongoose.model("USER", userSchema);

module.exports = userModel;
