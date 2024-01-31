const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = require("../models/user")
const auth_checker = require("../middlewares/auth");
const stores = require("../models/store");
const storeModel = require("../models/store");
const userModel = require("../models/user");
const userItem = require("../models/useritem");
const axios = require("axios");
const auth_checker = require("../middlewares/auth")


router.get("/api/all-users-except/:id",auth_checker, async (req, res, next) => {
  try {
    const users = await USER.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "_id",
    ]);
    return res.status(200).json(users);
  } catch (ex) {
    next(ex);
  }
});

router.get("/api/user/:id",auth_checker, (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.post("/api/search-users",auth_checker, (req, res) => {
  let userPattern = new RegExp(req.body.query, "i"); // add "^" at start for exact search
  USER.find({ name: { $regex: userPattern } })
    .select("_id email name")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/stores",auth_checker,async(req,res) => {
  const stores_available = await stores.find().select("name location _id")
  return res.status(200).json({data : stores_available})
})
router.get("/api/stores/:storeId",auth_checker,async(req,res) => {
  const storeId = req.params.storeId;
  const storePresent = await storeModel.findById(storeId).populate("foodItems","name location price _id")
  return res.status(200).json({data : storePresent});
})
router.post("/api/stores/:storeId",auth_checker,async(req,res) => {
  try {
    const userId = req.userData._id;
    const storeId = req.params.storeId;
    const itemId = req.body.itemId;
    if (!itemId) {
      return res.status(422).json({ error: "Please provide the itemId in the request body" });
    }
    const user = await userModel.findById(userId).populate('cart')
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const storeItem = await storeModel.findById(storeId).populate("foodItems");

    if (!storeItem) {
      return res.status(404).json({ error: "Store not found" });
    }
    const selectedItem = storeItem.foodItems.find((item) => item._id == itemId);
    if (!selectedItem) {
      return res.status(404).json({ error: "Item not found in the store" });
    }
    const newItem = {
      name: selectedItem.name,
      quantity: 1, // You can adjust the quantity as needed
      price: selectedItem.price,
    };
    let newItemMod = new userItem(newItem);
    const newItemModSaved = await newItemMod.save();
    user.cart.items.push(newItemModSaved._id);
    await user.cart.save()
    .then((saved,err) => {
      if(err){
        return res.status(400).json({error : err})
      }
      else{
        return res.status(200).json({data : saved})
      }
    })
  } catch (error) {
    console.error("Error adding item to the cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.get("/api/usercart",auth_checker,async(req,res) => {
  const userId = req.userData._id;
  try {
    const user = await userModel.findById(userId).populate({
      path: "cart",
      populate: {
        path: "items",
        model: "UserItem", // Adjust the model name based on your actual model
      },
    });
    return res.status(200).json({data : user.cart})
  } catch (error) {
    console.error("Error adding item to the cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.get("/api/recipes",auth_checker,async(req,res) => {
  const userId = req.userData._id;
  try {
    const user = await userModel.findById(userId).populate({
      path: "cart",
      populate: {
        path: "items",
        model: "UserItem", // Adjust the model name based on your actual model
      },
    });
    return res.status(200).json({data : user.cart})
  } catch (error) {
    console.error("Error adding item to the cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.post("/api/recipes",auth_checker,async(req,res) => {
  const userId = req.userData._id;
  const {userItemIds} = req.body
  try {
    const convertedItemIds = userItemIds.map(id => new mongoose.Types.ObjectId(id));
    const user = await userModel.findById(userId).populate({
      path: "cart",
      populate: {
        path: "items",
        model: "UserItem",
        select : "name",
        match : {_id : {$in : convertedItemIds}}
      },
    });
    const userItems = user.cart.items
    if (!userItems) {
      return res.status(404).json({ error: "User not found" });
    }
    const itemNames = userItems.map((item) => item.name);
    const baseURL = "https://api.spoonacular.com/recipes/findByIngredients";
    const apiKey = "dd37c14e77834c22ba2cb8e1193e6396";
    function constructRequestURL(ingredients, number) {
      let requestURL = `${baseURL}?ingredients=${ingredients.join(",")}&number=${number}&apiKey=${apiKey}`
      return requestURL;
    }
    const ingredients = itemNames;
    const number = 10; // Number of recipes to fetch
    const requestURL = constructRequestURL(ingredients, number)
    const response = await axios.get(requestURL)
    const recipes = response.data.map(recipe => {
      return ( {
        name: recipe.title,
        ingredients: [
          ...recipe.usedIngredients.map(ingredient => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit
          })),
          ...recipe.missedIngredients.map(ingredient => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit
          }))
        ]
      });
    });
    return res.status(200).json({recipes : recipes})
  } catch (error) {
    console.error("Error fetching user item names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
module.exports = router;
