import logger from '../../config/logger';
import {
  addVehicle,
  updateLocation,
  deRegisterVehicle,
  getAll,
  getAllVehicleLocations,
} from '../services/vehicle.services';

export const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await getAll();
    return res.json({ vehicles });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export const getVehicleLocations = async (req, res, next) => {
  try {
    const locations = await getAllVehicleLocations();
    return res.json(locations);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export const registerVehicle = async (req, res, next) => {
  try {
    const { id } = req.body;
    await addVehicle(id);
    return res.status(204).send();
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export const updateVehicleLocation = async (req, res, next) => {
  try {
    const { lat, lng, at } = req.body;
    const { id } = req.params;
    await updateLocation(id, lat, lng, at);
    return res.status(204).send();
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export const unRegisterVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deRegisterVehicle(id);
    return res.status(204).send();
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
