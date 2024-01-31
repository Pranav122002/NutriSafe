const mongoose = require("mongoose")
const StoreSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    foodItems : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "fooditem"
        }
    ], 
})
const storeModel = mongoose.model("store",StoreSchema);
module.exports = storeModel