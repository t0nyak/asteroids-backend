const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerDefinition = require('./swaggerDefinition');

const docsRouter = express.Router();

docsRouter.use('/', swaggerUi.serve);

docsRouter.get(
  '/',
  swaggerUi.setup(swaggerDefinition, {
    explorer: true,
  })
);

module.exports = docsRouter;
