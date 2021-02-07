const Product = require("../models/product");
const formidable = require('formidable');
const lodash = require('lodash');
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error : "Error Detected"
                })
            }

            req.product = product;
            next();
        })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error : "Unable to Create"
            })
        }

        const {name, description, price, stocks, category} = fields;

        if(!name || !description || !price || !stocks || !category) {
            return res.status(400).json({
                error : "MUST NOT BE EMPTY"
            })
        }

        let product = new Product(fields);

        if(file.picture) {
            if(file.picture.size > 5000000) {
                return res.status(400).json({
                    error : "Unable to save"
                })
            }

            product.picture.data = fs.readFileSync(file.picture.path);
            product.picture.contentType = file.picture.type;
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error : "Process Failed"
                })
            }

            res.json(product);
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.picture = undefined;
    return res.send(req.product);
}

exports.getPhoto = (req, res, next) => {
    if(req.product.picture.data) {
        res.set("Content-Type", req.product.picture.contentType);
        return res.send(req.product.picture.data);
    }

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
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Error Occurred"
            })
        }

        let updatedProduct = req.product;

        updatedProduct = lodash.extend(updatedProduct, fields);

        if(file.picture) {
            if(file.picture.size > 3000000) {
                return res.json({
                    message: "Image Size Too Big!!"
                })
            }

            updatedProduct.picture.data = fs.readFileSync(file.picture.path);
            updatedProduct.picture.contentType = file.picture.contentType;
        }

        updatedProduct.save((err, productUpdated) => {
            if(err) {
                return res.status(400).json({
                    message: "Product Saved"
                })
            }

            res.json(productUpdated);
        })
    })
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
            .select("-photo")
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