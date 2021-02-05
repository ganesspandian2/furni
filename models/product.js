const mongoose = require("mongoose");
const category = require("./category");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },

    description : {
        type : String,
        required : true,
        trim : true
    },

    price : {
        type : Number,
        required : true
    },

    stocks : {
        type : Number,
        default: 10
    },

    category : {
        type : ObjectId,
        ref : "Category",
        trim : true
    },
    
    sold : {
        type : Number,
        default : 0
    },

    picture : {
        data : Buffer,
        contentType : String
    }
});

module.exports = mongoose.model("Product", productSchema)