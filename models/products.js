const mongoose=require('mongoose');

const Schema = mongoose.Schema;


/**
 * @openapi
 * components:
 *    schemas:
 *       ProductSchema:
 *          type: object
 *          required:  
 *             - productName
 *             - description
 *             - price
 *          properties:
 *             productName:
 *                type: string
 *                example: HP Laptop
 *             description:
 *                type: string
 *                example: This is gaming laptop.
 *             price:
 *                type: string
 *                example: 55000
 * 
 *       
 */

const postSchema=new Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
       required: true
    },
    price:{
        type: String,
        required:true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
   }
       
    

});

module.exports=mongoose.model('products',postSchema);