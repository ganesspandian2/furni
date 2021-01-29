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

    InStock : {
        type : Boolean,
        required : true
    },

    category : {
        type : ObjectId,
        ref : "Category"
    },

    picture : {
        data : Buffer,
        contentType : String
    }
});

module.exports = mongoose.model("Product", productSchema)