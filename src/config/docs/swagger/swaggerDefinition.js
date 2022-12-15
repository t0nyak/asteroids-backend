const swaggerJsdoc = require('swagger-jsdoc');
const {
  app: { port },
} = require('../../env');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Scaffold',
      version: '1.0.0',
      description: 'Scaffold available endpoints',
      contact: {
        name: 'Proper path',
        url: 'https://proper.path',
        email: 'development@proper.path',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}/`,
      },
      /* {
        url: 'http://scaffold-lb-229626309.eu-west-2.elb.amazonaws.com/',
      }, */
    ],
  },
  apis: ['./src/config/docs/swagger/**/*.yml'],
};

module.exports = swaggerJsdoc(options);
