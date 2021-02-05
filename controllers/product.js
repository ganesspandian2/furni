// const product = require("../models/product");
const Product = require("../models/product");
const formidable = require('formidable');
const _ = require('lodash');
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