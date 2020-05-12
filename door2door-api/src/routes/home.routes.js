import { Router } from 'express';
import * as homeController from '../controllers/home';

const router = Router();
router.get('/', homeController.index);

/**
 * @swagger
 *
 * /status:
 *    get:
 *     description: Get Info about the Server Status
 *     tags:
 *       - Status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Should return a JSON response with the Status Data
 *       400:
 *         description: Bad request
 *       500:
 *         description: Generic error
 *       503:
 *         description: Server Error
 */
router.get('/status', homeController.status);

export default router;
