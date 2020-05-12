import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import {
  registerVehicle,
  updateVehicleLocation,
  unRegisterVehicle,
  getAllVehicles,
  getVehicleLocations,
} from '../controllers/vehicle.controller';
import checkVehicleRegistration from '../middlewares/registered-vehicle.middleware';
import checkCityBoundaries from '../middlewares/city-boundaries.middleware';

const routes = Router();

/**
 * @swagger
 *
 * /vehicles/:
 *    get:
 *     description: Get All Vehicles
 *     tags:
 *       - Vehicles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Should return a JSON with All Vehicles
 *       400:
 *         description: Bad request
 *       500:
 *         description: Generic error
 */
routes.get('/', getAllVehicles);

/**
 * @swagger
 *
 * /vehicles/locations:
 *    get:
 *     description: Get All Vehicles Locations
 *     tags:
 *       - Vehicles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Should return a JSON with All Vehicles Locations
 *       400:
 *         description: Bad request
 *       500:
 *         description: Generic error
 */
routes.get('/locations', getVehicleLocations);

/**
 * @swagger
 *
 * /vehicles/:
 *    post:
 *     description: Register a new Vehicle
 *     tags:
 *       - Vehicles
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: 'bac5188f-67c6-4965-81dc-4ef49622e280'
 *     responses:
 *       204:
 *         description: Should return a successful regiter but with a response empty body
 *       400:
 *         description: Bad request
 *       500:
 *         description: Generic error
 */
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().guid({
        version: ['uuidv4'],
      }),
    }),
  }),
  registerVehicle,
);

/**
 * @swagger
 *
 * /vehicles/{id}/locations:
 *    post:
 *     description: Update a Vehicle Location
 *     tags:
 *       - Vehicles
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Vehicle UUID
 *        required: true
 *        schema:
 *          type: string
 *          example: 'bac5188f-67c6-4965-81dc-4ef49622e280'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lat
 *               - lng
 *             properties:
 *               lat:
 *                 description: Latitude
 *                 type: number
 *                 example: 52.53
 *               lng:
 *                 description: Longitude
 *                 type: number
 *                 example: 13.403
 *               at:
 *                 description: Date ISO8601 Format
 *                 type: date
 *                 example: '2020-05-01T10:00:00Z'
 *     responses:
 *       200:
 *         description: Should return a successful updated location but with a response empty body
 *       400:
 *         description: Bad request
 *       404:
 *         description: Vehicle Not Registered / Out of the City Boundaries
 *       500:
 *         description: Generic error
 */
routes.post(
  '/:id/locations',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({
        version: ['uuidv4'],
      }),
    }),
    [Segments.BODY]: Joi.object().keys({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
      at: Joi.date().default(new Date()),
    }),
  }),
  checkVehicleRegistration,
  checkCityBoundaries,
  updateVehicleLocation,
);

/**
 * @swagger
 *
 * /vehicles/{id}:
 *    delete:
 *     description: De-Register a Vehicle (Delete from Database)
 *     tags:
 *       - Vehicles
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Vehicle UUID
 *        required: true
 *        schema:
 *          type: string
 *          example: 'bac5188f-67c6-4965-81dc-4ef49622e280'
 *     responses:
 *       200:
 *         description: Should return a successful deleted but with a response empty body
 *       400:
 *         description: Bad request
 *       404:
 *         description: Vehicle Not Registered
 *       500:
 *         description: Generic error
 */
routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({
        version: ['uuidv4'],
      }),
    }),
  }),
  checkVehicleRegistration,
  unRegisterVehicle,
);

export default routes;
