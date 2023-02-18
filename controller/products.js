const Products = require('../models/products');
const Users = require('../models/users');
const mongoose = require('mongoose');



    
/*------------------------------------------------------Products------------------------------------------------------------------------*/
/**
 * @openapi
 * components:
 *    schemas:
 *       ProductResponse200:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 *
 *
 */

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
        
        if (!( productName && description && price)) {
          const error = new Error("Bad request.");
          error.statusCode = 400;
          throw error;
        }
        
        const userData = await Users.findById(req.userId);
         if (!userData) {
           const error = new Error("User could not be found.");
           error.statusCode = 404;
           throw error;
         }

         const post = new Products({
           productName,description,price,userId:userData._id
         });
        const product = await post.save();
        if (! product) {
            throw new Error("Something went wrong.");
        }
        const user = await Users.findByIdAndUpdate(userData._id, { $push: { products: product._id } });
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

/**
 * @openapi
 * components:
 *    schemas:
 *       ProductResponse201:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 *
 *
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       Error404:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 *
 *
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       Error403:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 *
 *
 */



exports.updateProduct = async (req, res, next) => {
    try {
         const { productId } = req.params;
         const { productName, description, price } = req.body;

        if (!(productName && description && price)) {
          const error = new Error("Bad request.");
          error.statusCode = 400;
          throw error;
        }
        
         const product = await Products.findById(productId);
         if (!product) {
           const error = new Error("Product with this id does not exists.");
           error.statusCode = 404;
           throw error;
        }
        
        
        if (product.userId.toString() !== req.userId.toString()) {
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
         const { productId } = req.params;
       
         const product = await Products.findById(productId);
         if (!product) {
           const error = new Error("Product with this id does not exists.");
           error.statusCode = 404;
           throw error;
        }
        
       if (product.userId.toString() !== req.userId.toString()) {
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


