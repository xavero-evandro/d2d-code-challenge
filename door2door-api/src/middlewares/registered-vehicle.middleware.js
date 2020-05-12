import { Vehicles } from '../models/vehicle';
import logger from '../../config/logger';

const checkVehicleRegistration = async (req, res, next) => {
  try {
    const found = await Vehicles.findOne({ id: req.params.id });
    if (!found)
      return res.status(404).json({ message: 'Vehicle Not Registered' });
    next();
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export default checkVehicleRegistration;
