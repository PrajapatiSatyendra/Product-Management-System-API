const express=require('express');
const router=express.Router();
const productController=require('../controller/products');
const isAuth=require('../middleware/is-auth');



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
 * /admin/updateCourse/{id}:
 *    put:
 *       tags:
 *          - Update Course
 *       description: This API is built for updating the course.
 *       parameters:
 *          - in: path
 *             name: id
 *             required: true
 *             schema:
 *                type: string
 *       security:
 *          bearerAuth: []
 *       requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                  $ref: '#components/schemas/'
 *       responses:
 *          201:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/' 
 * 
 */


router.get('/getProducts',productController.getProducts);
router.get("/getProductsByUserId/:userId", productController.getProductsByUserId);
router.post("/addProduct/:userId",isAuth, productController.addProduct);
router.put("/updateProduct/:userId/:productId", isAuth, productController.updateProduct);
router.delete(
  "/deleteProduct/:userId/:productId",
  isAuth,
  productController.deleteProduct
);



module.exports=router;