const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8000;
require('./db/index')
const route = require("./src/Route/index");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Image upload',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It uploads and fetch image to/from MongoDB',
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/Route/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/images', express.static('images'));
app.use(bodyParser.json());
app.use(route)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
