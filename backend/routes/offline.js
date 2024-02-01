const express = require("express");
const router = express.Router();
const fs = require("fs");
const storeModel = require("../models/store");

router.get("/api/download-store-DB", async (req, res) => {
  try {
    const stores = await storeModel.find({}).populate("foodItems").lean();
    const fileName = "store_database.txt";

    const dataString = stores.map((store) => {
      const foodItemsDetails = store.foodItems ? store.foodItems.map(foodItem => `${foodItem.name} (${foodItem.price}$)`).join(", ") : '';
      return `Name: ${store.name}, Location: ${store.location}, FoodItems: ${foodItemsDetails}\n`;
    }).join("\n");

    fs.writeFileSync(fileName, dataString);

    res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-type", "text/plain");

    const fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);

    fileStream.on("end", () => {
      fs.unlinkSync(fileName);
    });
  } catch (error) {
    console.error("Error exporting database:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
