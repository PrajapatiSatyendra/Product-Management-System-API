const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const User=require('../models/users');
const authController = require('../controller/auth');


/**
 * @openapi 
 * /api/auth/signup:
 *  put:
 *    tags:
 *       - Sign Up
 *    description: This api is for user signup
 *    requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema: 
 *                $ref: '#components/schemas/UserSignUp'
 *    responses:
 *       201:
 *          description: Success
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/UserSignUpResponse201'
 *       400:
 *          description: Bad Request
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error400'
 *       500:
 *          description: Internal Server Error
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error500'
 *    
 */

router.put('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value,{req})=>{
        return User.findOne({email:value}).then(userDoc=>{
            if (userDoc) {
                return Promise.reject('E-mail address already exists');
            }
            
        });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:5})
], authController.signup);

/**
 * @openapi
 * /api/auth/login:
 *    post:
 *       tags:
 *          - Login
 *       description: API for user login
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/LoginRequest'
 *       responses:
 *          200:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/LoginResponse200'
 *          401:
 *             description: Bad Request
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error400'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   Schema:
 *                      $ref: '#components/schemas/Error500'
 * 
 *       
 */

router.post('/login',authController.login);

module.exports=router;