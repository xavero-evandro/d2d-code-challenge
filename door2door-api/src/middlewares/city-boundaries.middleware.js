import logger from '../../config/logger';
import {
  D2D_OFFICE_LAT,
  D2D_OFFICE_LNG,
  CITY_BOUNDARIES_RADIUS_KM,
} from '../constants/d2d-office-lat-lng';

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const checkCityBoundaries = (req, res, next) => {
  try {
    const { lat, lng } = req.body;

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat - D2D_OFFICE_LAT);
    const dLon = deg2rad(lng - D2D_OFFICE_LNG);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(D2D_OFFICE_LAT)) *
        Math.cos(deg2rad(lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in km

    if (distance > CITY_BOUNDARIES_RADIUS_KM)
      return res.status(404).json({ message: 'Out Of The City Boundaries' });

    return next();
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export default checkCityBoundaries;
