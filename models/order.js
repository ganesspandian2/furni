const mongoose = require("mongoose");
const { stringify } = require("uuid");
const {ObjectId} = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product"
    },

    name : String,
    quantity : Number,
    price : Number,
});

const cart = mongoose.model("Cart", CartSchema);

const OrderSchema = new mongoose.Schema({
    products : [CartSchema],
    transactions_id = {},

    amount : {
        type : Number,
        required : true,
    },

    address : {
        type : String,
        required : true
    },

    user : {
        type : ObjectId,
        ref : "User"
    }
}, { timestamps : true });

const Order = mongoose.model("Order", OrderSchema);
