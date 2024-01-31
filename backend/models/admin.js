const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    storesOwned : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "store"
        }
    ]
})
const adminModel = mongoose.model('admin',adminSchema);
module.exports  = adminModel;