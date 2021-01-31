const express = require("express");
const { createCategory, getCategoryById, getCategory, getAllCategories, updateCategory } = require("../controllers/category");
const {isSignedIn , isAuthenticated, isAdmin } = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);



module.exports = router;