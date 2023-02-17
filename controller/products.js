const Products = require('../models/products');
const Users = require('../models/users');
const mongoose = require('mongoose');

    
/*------------------------------------------------------Products------------------------------------------------------------------------*/
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Products.find();
    if (! products) {
        throw new Error("Something went wrong.");
    }
      
    res
        .status(200)
        .json({ message: "Products fetched successfully", data: products });
    } catch (error) {
        next(error);
    }
    
};


exports.addProduct= async (req,res,next)=>{
    try {
        const { productName, description, price } = req.body;
        const { userId } = req.params;
        
        if (!( productName && description && price)) {
          const error = new Error("Bad request.");
          error.statusCode = 400;
          throw error;
        }

        const userData = await Users.findById(userId);
        if (! userData) {
            const error = new Error("Access denied.");
            error.statusCode = 403;
            throw error;
        }

         const post = new Products({
           productName,description,price,userId
         });
        const product = await post.save();
        if (! product) {
            throw new Error("Something went wrong.");
        }
        const user = await Users.findByIdAndUpdate(userId, { $push: { products: product._id } });
        if (! user) {
            throw new Error("Something went wrong.");
        }
        res
          .status(201)
          .json({ message: "Product added successfully", data: product });
    } catch (error) {
        next(error);
    }

    
};

exports.getProductsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
       
        const products = await Products.find({ userId: userId });
        if (! products) {
            throw new Error("Something went wrong.");
        }
        res.status(200).json({ message: "Products fetched successfully.", data: products });
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
         const { userId, productId } = req.params;
         const { productName, description, price } = req.body;

       
        
         const product = await Products.findById(productId);
         if (!product) {
           const error = new Error("Product with this id does not exists.");
           error.statusCode = 404;
           throw error;
        }
        
        
        if (product.userId.toString() !== userId) {
            const error = new Error("Access denied.");
            error.statusCode = 403;
            throw error;
        }

         const updatedProduct = await Products.findByIdAndUpdate(
           productId,
           { productName, description, price },
           { new: true }
         );
         if (!updatedProduct) {
           throw new Error("Something went wrong.");
         }

         res
           .status(201)
           .json({ message: "Updated successfully", data: updatedProduct });
    } catch (error) {
        next(error);
    }
   
  
};

exports.deleteProduct= async(req,res,next)=>{
    try {
         const { userId, productId } = req.params;
       
         const product = await Products.findById(productId);
         if (!product) {
           const error = new Error("Product with this id does not exists.");
           error.statusCode = 404;
           throw error;
        }
        
        if (product.userId.toString() !== userId) {
            const error = new Error("Access denied.");
            error.statusCode = 403;
            throw error;
        }

         const deletedProduct = await Products.findByIdAndDelete(productId);
         if (!deletedProduct) {
           throw new Error("Something went wrong.");
         }

        res
          .status(200)
          .json({ message: "Product Deleted successfully", data: deletedProduct });
    } catch (error) {
        next(error);
    }
   
};


