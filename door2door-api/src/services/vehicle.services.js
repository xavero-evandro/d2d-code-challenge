import { v4 as uuidv4 } from 'uuid';
import logger from '../../config/logger';
import { Vehicles, VehicleLocations } from '../models/vehicle';

export const getAll = async () => {
  try {
    return VehicleLocations.find();
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

export const getAllVehicleLocations = async () => {
  try {
    return VehicleLocations.aggregate([
      {
        $group: {
          _id: '$vehicleId',
          lat: { $push: '$lat' },
          lng: { $push: '$lng' },
          at: { $push: '$at' },
        },
      },
    ]);
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

export const addVehicle = async vehicleId => {
  try {
    return await Vehicles.findOne({ id: vehicleId }).then(
      car => car || Vehicles.create({ id: vehicleId }),
    );
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

export const updateLocation = async (vehicleId, lat, lng, at) => {
  try {
    return VehicleLocations.create({
      id: uuidv4(),
      vehicleId,
      lat,
      lng,
      at,
    });
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

export const deRegisterVehicle = async vehicleId => {
  try {
    return Vehicles.findOneAndDelete({ id: vehicleId });
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};
