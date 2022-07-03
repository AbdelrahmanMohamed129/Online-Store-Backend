const category = require('../models/category');

function createCategory(req) {
    return new category({
        name: req.body.name
    });
}

exports.createOneCategory = (req,res,next) =>{
    createCategory(req).save().then(Category =>{
        return res.status(201).json({
            message:"Category added successfully",
            Category:Category
        });
    })
    .catch(error => {
        next(error);
    });
};

exports.deleteOneCategory = (req,res,next) => {
    const categoryName = req.params.categoryName;

    category
        .remove({name : categoryName}).exec()
        .then(result => {
            return res.status(200).json({
                message: "Category deleted successfully",
                result: result
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getCategories = (req,res,next) => {
    category
        .find().exec()
        .then(cat => {
            return res.status(200).json({
                categories: cat
            })
        })
        .catch(error => {
            next(error);
        });
};