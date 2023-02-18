const express=require('express');
const router=express.Router();
const productController=require('../controller/products');
const isAuth = require('../middleware/is-auth');

/**
 * @openapi
 * components:
 *    securitySchemes:
 *       bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */



/**
 * @openapi
 * /api/product/getProducts:
 *    get:
 *       tags:
 *          - Fetch Products
 *       description: This API is built for fetching the Products.
 *       responses:
 *          200:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ProductResponse200'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error500' 
 * 
 */

router.get("/getProducts", productController.getProducts);



/**
 * @openapi
 * /api/product/getProductsByUserId/{userId}:
 *    get:
 *       tags:
 *          - Update Product
 *       description: This API is built for fetching product by userId.
 *       parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            description: User ID is required
 *            schema: 
 *               type: string
 *       responses:
 *          200:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ProductResponse200'
 *          404:
 *             description: Not Found
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error404'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error500' 
 * 
 */

router.get(
  "/getProductsByUserId/:userId",
  productController.getProductsByUserId
);

/**
 * @openapi
 * /api/product/addProduct/{userId}:
 *    post:
 *       tags:
 *          - Add Product
 *       description: User can add the product. To add the product user has to authenticate first. User can only add product to his/her own account.
 *       security:
 *          - bearerAuth: []
 *       parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            description: user Id is required
 *            schema:
 *               type: string
 *       requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                  $ref: '#components/schemas/ProductSchema'
 *       responses:
 *          201:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ProductResponse201'
 *          401:
 *             description: Not Authenticated
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error401'
 *          403:
 *             description: Not Authorized
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error403'
 *          404:
 *             description: Not Found
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error404'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error500' 
 * 
 */

router.post("/addProduct/:userId",isAuth, productController.addProduct);



/**
 * @openapi
 * /api/product/updateProduct/{userId}/{productId}:
 *    put:
 *       tags:
 *          - Update Product
 *       description: This API is built for updating the Product.
 *       security:
 *          - bearerAuth: []
 *       parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            description: User Id is required
 *            schema:
 *               type: string
 *          - in: path
 *            name: productId
 *            required: true
 *            description: Product Id is required
 *            schema:
 *               type: string
 *       requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                  $ref: '#components/schemas/ProductSchema'
 *       responses:
 *          201:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ProductResponse201'
 *          401:
 *             description: Not Authenticated
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error401'
 *          403:
 *             description: Not Authorized
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error403'
 *          404:
 *             description: Not Found
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error404'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error500' 
 * 
 */

router.put("/updateProduct/:userId/:productId", isAuth, productController.updateProduct);

/**
 * @openapi
 * /api/product/deleteProduct/{userId}/{productId}:
 *    delete:
 *       tags:
 *          - Delete Product
 *       description: Delete the product. Authorization is required for deleting the product.
 *       security:
 *          - bearerAuth: []
 *       parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            description: User Id is required
 *            schema:
 *               type: string
 *          - in: path
 *            name: productId
 *            required: true
 *            description: Product Id is required
 *            schema:
 *               type: string
 *       responses:
 *          200:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ProductResponse200'
 *          401:
 *             description: Not Authenticated
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error401'
 *          403:
 *             description: Not Authorized
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error403'
 *          404:
 *             description: Not Found
 *             content:
 *                application/json:
 *                   schema:
 *                   $ref: '#components/schemas/Error404'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error500' 
 * 
 */

router.delete(
  "/deleteProduct/:userId/:productId",
  isAuth,
  productController.deleteProduct
);



module.exports=router;