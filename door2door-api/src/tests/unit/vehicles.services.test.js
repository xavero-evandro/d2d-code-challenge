/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import {
  addVehicle,
  updateLocation,
  deRegisterVehicle,
} from '../../services/vehicle.services';
import { Vehicles, VehicleLocations } from '../../models/vehicle';

jest.mock('../../models/vehicle');

describe('Test Vehicles Services', () => {
  describe('Test Add Vehicle', () => {
    it('Should return no errors when register a new vehicle', async done => {
      const mockResult = {
        createdAt: '2020-05-09T22:07:50.864Z',
        updatedAt: '2020-05-09T22:07:50.864Z',
        id: 'bac5188f-67c6-4965-81dc-4ef49622e280',
      };
      Vehicles.findOne = jest.fn().mockResolvedValue(mockResult);
      const result = await addVehicle('bac5188f-67c6-4965-81dc-4ef49622e280');
      expect(Vehicles.findOne).toBeCalled();
      expect(Vehicles.findOne).toHaveBeenCalledWith({
        id: 'bac5188f-67c6-4965-81dc-4ef49622e280',
      });
      expect(result).toBe(mockResult);
      done();
    });

    it('Should return Error when register a new vehicle with wrong parameter', async done => {
      Vehicles.findOne = jest.fn().mockImplementation(async () => {
        return new Error('Database Failure');
      });
      const result = await addVehicle('bac5188f-67c6-4965-81dc-4ef49622e280');
      expect(Vehicles.findOne).toBeCalled();
      expect(result).toStrictEqual(Error('Database Failure'));
      done();
    });
  });
  describe('Test Update Location', () => {
    it('Should return a updated Location', async done => {
      const mockResult = {
        at: '2020-05-10T11:15:22.219Z',
        createdAt: '2020-05-10T11:15:01.931Z',
        updatedAt: '2020-05-10T11:15:01.931Z',
        id: '2e0dc477-494a-4591-b109-142f7cef44b4',
        lat: 52.52,
        lng: 13.402,
      };
      VehicleLocations.create = jest.fn().mockResolvedValue(mockResult);
      const result = await updateLocation(
        'bac5188f-67c6-4965-81dc-4ef49622e280',
        53.3,
        13.403,
        new Date(),
      );
      expect(VehicleLocations.create).toBeCalled();
      expect(result).toBe(mockResult);
      done();
    });

    it('Should return Error when update a location with wrong parameter', async done => {
      VehicleLocations.create = jest.fn().mockImplementation(async () => {
        return new Error('Database Failure');
      });
      const result = await updateLocation(
        'bac5188f-67c6-4965-81dc-4ef49622e280',
        53.3,
        13.403,
        new Date(),
      );
      expect(VehicleLocations.create).toBeCalled();
      expect(result).toStrictEqual(Error('Database Failure'));
      done();
    });
  });
  describe('Test Unregister Vehicle', () => {
    it('Should return a unregistered Vehicle (delete from database)', async done => {
      const mockResult = {
        at: '2020-05-10T11:15:22.219Z',
        createdAt: '2020-05-10T11:15:01.931Z',
        updatedAt: '2020-05-10T11:15:01.931Z',
        id: '2e0dc477-494a-4591-b109-142f7cef44b4',
        lat: 52.52,
        lng: 13.402,
      };
      Vehicles.findOneAndDelete = jest.fn().mockResolvedValue(mockResult);
      await deRegisterVehicle('bac5188f-67c6-4965-81dc-4ef49622e280');
      expect(Vehicles.findOneAndDelete).toBeCalled();
      expect(Vehicles.findOneAndDelete).toHaveBeenCalledWith({
        id: 'bac5188f-67c6-4965-81dc-4ef49622e280',
      });
      done();
    });
  });
});
