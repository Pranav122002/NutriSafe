const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const adminModel = require("../models/admin")
const storeModel = require("../models/store")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_checker = require("../middlewares/auth")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/admin/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  adminModel.findOne({ $or: [{ email: email }] }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exist with that email" });
    }
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new adminModel({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          res.json({ message: "Registered successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

router.post("/admin/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }

  adminModel.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({ message: "Signed in Successfully" })
          const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
          const { _id, name, email } = savedUser;

          res.json({ token, user: { _id, name, email } });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
});
router.post("/admin/addstore",auth_checker,async(req,res) => {
    const adminId = req.userData._id;
  const { storeName, location } = req.body;

  try {
    if (!storeName || !location) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const newStoreData = {
      name: storeName,
      location: location,
    };
    const newStore = new storeModel(newStoreData);
    const storeSaved = await newStore.save();
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      adminId,
      {
        $push: { storesOwned: storeSaved._id },
      },
      { new: true }
    );

    if (updatedAdmin) {
      return res.status(200).json({
        message: "Store and Admin updated successfully",
        data: { store: storeSaved, admin: updatedAdmin },
      });
    } else {
      return res.status(400).json({ message: "Could not update the admin" });
    }
  } catch (error) {
    console.error("Error adding store to admin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

})
router.get("/admin/profile",auth_checker,async(req,res) => {
    const adminId = req.userData._id;

  try {
    const admin = await adminModel
      .findById(adminId)
      .populate("storesOwned", "name location");

    if (admin) {
      return res.status(200).json({ data: admin });
    } else {
      return res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/admin/addproducts",async(req,res) => {
    
})
module.exports = router;
