const mongoose = require("mongoose")
const storeSchema = mongoose.Schema({
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
module.exports = mongoose.model("STORE", storeSchema);