import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import home from './home.routes';
import vehicles from './vehicle.routes';
import swaggerSpec from '../../swagger';

const routes = Router();

routes.use('/', home);
routes.use('/vehicles', vehicles);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default routes;
