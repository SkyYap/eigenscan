import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'EigenScan API',
      version: '1.0.0',
      description: 'API documentation for EigenScan',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./api/*.js'], // Path to the API files containing Swagger annotations
};

const specs = swaggerJsdoc(options);

export default specs;
