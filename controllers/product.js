const Product = require("../models/product");
const formidable = require('formidable');
const lodash = require('lodash');
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error : err
                })
            }

            req.product = product;
            next();
        })
}

exports.createProduct = (req, res) => {
    let product = new Product(req.body);

    product.save((err, newProduct) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        res.json(newProduct);
    })
}

exports.getProduct = (req, res) => {
    req.product.picture = undefined;
    return res.send(req.product);
}

exports.getPhoto = (req, res, next) => {
    res.send(req.product.picture);

    next();
}

exports.removeProduct = (req, res) => {
    let product = req.product;

    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Product unable to remove"
            })
        }

        res.json({ message: "Product Deleted" });
    })
}

exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(
        {_id: req.product._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},

        (err, updatedProduct) => {
            if (err) {
                return res.status(400).json({
                    error: "Error Detected"
                })
            }

            res.json(updatedProduct)
        }
    )
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
            .select("-picture")
            .populate("category")
            .limit(limit)
            .sort([[sortBy, "asc"]])
            .exec((err, products) => {
                if (err) {
                    return res.status(400).json({
                        error: "Error Occurred"
                    })
                }

                res.json(products)
            })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Error Occurred"
            })
        }

        res.json(category);
    })
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne : {
                filter : {_id : product._id},
                update : {stock : -product.stock, sold : +product.sold}
            }
        }
    });

    Product.bulkWrite(myOperations, {}, (err, results) => {
        if (err) {
            return res.status(400).json({
                error : "Error occurred"
            })
        }

        next();
    })
}