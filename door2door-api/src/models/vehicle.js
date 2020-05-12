import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true,
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const vehicleLocationsSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true,
  },
  vehicleId: String,
  lat: Number,
  lng: Number,
  at: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const Vehicles = mongoose.model('Vehicles', vehicleSchema);
export const VehicleLocations = mongoose.model(
  'VehicleLocations',
  vehicleLocationsSchema,
);
