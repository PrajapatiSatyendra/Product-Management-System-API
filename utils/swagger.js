
const { version } = require('../package.json');
const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'College Management System',
            version
        },
        servers: [
            {
                url: process.env.BASEURL
            }
        ]
    },
    apis:['./routes/*.js','./controller/*.js']
}

 const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;



