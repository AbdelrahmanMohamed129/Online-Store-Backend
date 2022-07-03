const product = require('../models/product');

function createProduct (req) {
    return new product ({
        name: req.body.name,
        price: req.body.price,
        image: req.files.path,
        category: req.body.category
        // TODO: sold count
    });
};

exports.createOneProduct = (req,res,next) =>{

    createProduct(req).save().then(Product =>{
        return res.status(201).json({
            message:"product added successfully",
            // TODO: maybe wrong?? 
            Product:Product
        });
    })
    .catch(error => {
        next(error);
    });
};

exports.getOneProduct = (req,res,next) =>{
    const prodName = req.params.productName;

    product
        .find({name: prodName})
        .select('name price image category')
        .populate('category')
        .exec()
        .then(product =>{
            if(prodcut){
                res.status(200).json(product);
            }
            else{
                res.status(404).json({
                    message: 'Seems like the product was just deleted! =)'
                });
            }
        })
    .catch(error => {
        next(error);
    });
};


exports.updateOneProduct = (req,res,next) =>{
    const prodName = req.params.productName;

    product
        .update({name: prodName},{$set: req.body})
        .exec()
        .then(result =>{
        return res.status(200).json({
            message:"product updated successfully",
            result:result
        });
    })
    .catch(error => {
        next(error);
    });
};

exports.deleteOneProduct = (req,res,next) =>{
    const prodName = req.params.productName;

    product
        .remove({name: prodName})
        .exec()
        .then(result =>{
        return res.status(200).json({
            message:"product deleted successfully",
            result:result
        });
    })
    .catch(error => {
        next(error);
    });
};
