const express = require("express")
const router = express.Router();

const { getProductById, createProduct, getProduct, getPhoto, updateProduct, removeProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");
const {} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("productId", getProductById);
router.param("userId", getUserById);

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);
router.get("/product/category", getAllUniqueCategories);

router.put("/product/updateProduct/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

router.delete("/product/deleteProduct/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct);

router.get("/products", getAllProducts);
module.exports = router;