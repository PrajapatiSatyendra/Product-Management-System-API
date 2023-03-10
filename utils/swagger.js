
const { version } = require('../package.json');
const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Management System API",
      description:
        "This is a basic REST API for Product Management. It focuses on CRUD operations with authentication and authorization",
      version,
    },
    servers: [
      {
        url: process.env.BASEURL,
      },
    ],
  },
  apis: [
    "./routes/*.js",
    "./controller/*.js",
    "./models/*.js",
    "./middleware/*.js",
  ],
};

 const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;



