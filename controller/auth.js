const Users = require("../models/users");
require('dotenv').config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*-----------------------------------------------------------------------------------------------------------------------------*/


/**
 * @openapi
 * components:
 *    schemas:
 *       UserSignUpResponse201:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *                description: user created
 *             data:
 *                type: object
 *
 *
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       Error400:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       Error500:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *
 */

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.data = errors.array();
      throw error;
    }

    const { fullName, email, password } = req.body;
    if (!fullName) {
      const error = new Error("Bad request");
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new Users({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    if (!savedUser) {
      throw new Error("Something went wrong.");
    }

    res
      .status(201)
      .json({ message: "Signed Up successfully.", data: savedUser });
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * components:
 *    schemas:
 *       LoginResponse200:
 *          type: object
 *          properties:
 *             token:
 *                type: string
 *             userId:
 *                type: string
 *             expiresIn:
 *                type: integer
 *             email:
 *                type: string
 *             userName:
 *                type: string
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       LoginRequest:
 *          type: object
 *          required:
 *             - email
 *             - password
 *          properties:
 *             email:
 *                type: string
 *                example: satyendra@gmail.com
 *             password:
 *                type: password
 *                example: password123
 */

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      const error = new Error("Bad request");
      error.statusCode = 400;
      throw error;
    }
    const userData = await Users.findOne({ email });
    if (!userData) {
      const error = new Error(" A user with this id could not be found.");
      error.statusCode = 404;
      throw error;
    }
    const passwordCompare = await bcrypt.compare(password, userData.password);
    if (!passwordCompare) {
      const error = new Error("Incorrect E-mail address or Password.");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: userData.email,
        userId: userData._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME }
    );

    res.status(200).json({
      token: token,
      userId: userData._id,
      email: userData.email,
      userName: userData.fullName,
      expiresIn: 24 * 60 * 60,
    });
  } catch (error) {
    next(error);
  }
};
