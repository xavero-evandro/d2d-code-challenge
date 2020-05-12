import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      version: '1.0.0',
      title: 'Door 2 Door APIs Document',
      description: 'Door 2 Door API',
      termsOfService: '',
    },
  },
  // Path to the API docs
  apis: ['./src/routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
