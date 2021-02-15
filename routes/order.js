const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");
const { updateStock } = require("../controllers/product");
const { updateOrderHistory, getUserById } = require("../controllers/user");
const {getOrderById, createOrder, getAllOrders, updateStatus} = require("../controllers/order");
const router = express.Router()

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post("/order/create/:userId", isSignedIn, isAuthenticated, updateOrderHistory, updateStock , createOrder);

router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

router.put("/order/cancel/:orderId/:userId", isSignedIn, isAuthenticated, isAdmin , updateStatus);




module.exports = router; 
