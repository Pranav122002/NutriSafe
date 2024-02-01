const mongoose = require("mongoose");
const FoodItem = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    location : {
        floor : {
            type : String,
            required : true,
        },
        department : {
            type : String,
            required : true,
        }
    },
    containsAllergens : {
        type : Boolean,
        required : true
    },
    allergens : [
        {
            type : String,
        }
    ],
    price : {
        type : Number,
        required : true
    }
})
const foodItem = mongoose.model('fooditem',FoodItem);
module.exports = foodItem;