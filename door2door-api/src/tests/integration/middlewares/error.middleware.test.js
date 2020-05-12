/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import httpMocks from 'node-mocks-http';
import dbHandler from '../../db-handler-tests';
import errorHandler from '../../../middlewares/error.middleware';

let req;
let res;
let next;

beforeAll(async () => {
  await dbHandler.connect();
});

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('Test Error Handler', () => {
  it('Should return 500 ', () => {
    const error = new Error('Exception');
    errorHandler(error, req, res, next);
    expect(res.statusCode).toBe(500);
  });
});
