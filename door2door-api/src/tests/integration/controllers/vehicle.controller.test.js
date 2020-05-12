/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import supertest from 'supertest';
import dbHandler from '../../db-handler-tests';
import app from '../../../app';

const request = supertest(app);

beforeAll(async () => {
  await dbHandler.connect();
});

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('GET /vehicles', () => {
  beforeAll(async () => {
    await request
      .post('/vehicles')
      .send({ id: 'bac5188f-67c6-4965-81dc-4ef49622e280' });
    await request
      .post('/vehicles/bac5188f-67c6-4965-81dc-4ef49622e280/locations')
      .send({
        lat: 52.52,
        lng: 13.402,
        at: new Date(),
      });
  });

  it('Should return all vehicles', async done => {
    const response = await request.get('/vehicles').send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('vehicles');
    expect(response.body.vehicles.length).toBeGreaterThanOrEqual(1);
    done();
  });
});

describe('GET /vehicles/locations', () => {
  beforeAll(async () => {
    await dbHandler.clearDatabase();
    await request
      .post('/vehicles')
      .send({ id: 'bac5188f-67c6-4965-81dc-4ef49622e280' });
    await request
      .post('/vehicles/bac5188f-67c6-4965-81dc-4ef49622e280/locations')
      .send({
        lat: 52.52,
        lng: 13.402,
        at: '2020-05-12T09:17:45.745Z',
      });
  });

  it('Should return all vehicles Locations', async done => {
    const responseBody = [
      {
        _id: 'bac5188f-67c6-4965-81dc-4ef49622e280',
        at: ['2020-05-12T09:17:45.745Z'],
        lat: [52.52],
        lng: [13.402],
      },
    ];
    const response = await request.get('/vehicles/locations').send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(responseBody);
    done();
  });
});

describe('POST /vehicles', () => {
  it('Should return 204 with a successful register Vehicle', async done => {
    const response = await request
      .post('/vehicles')
      .send({ id: 'bac5188f-67c6-4965-81dc-4ef49622e280' });
    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
    done();
  });

  it('Should return 400 for an invalid Vehicle UUID', async done => {
    const responseBody = {
      statusCode: 400,
      error: 'Bad Request',
      message: '"id" must be a valid GUID',
      validation: { source: 'body', keys: ['id'] },
    };
    const response = await request
      .post('/vehicles')
      .send({ id: 'fv35188f-c7c6-196a-8gdc-4ef49t22e280' });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual(responseBody);
    done();
  });
});

describe('POST /vehicles/:id/locations', () => {
  beforeAll(async () => {
    await request
      .post('/vehicles')
      .send({ id: 'bac5188f-67c6-4965-81dc-4ef49622e280' });
  });

  it('Should return 204 with a updated location', async done => {
    const response = await request
      .post('/vehicles/bac5188f-67c6-4965-81dc-4ef49622e280/locations')
      .send({
        lat: 52.52,
        lng: 13.402,
        at: new Date(),
      });
    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
    done();
  });

  it('Should return 404 for unregistered Vehicle', async done => {
    const response = await request
      .post('/vehicles/aac5188f-67c6-4965-81dc-4ef49622e280/locations')
      .send({
        lat: 52.52,
        lng: 13.402,
        at: new Date(),
      });
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'Vehicle Not Registered' });
    done();
  });

  it('Should return 400 for invalid Date Format', async done => {
    const response = await request
      .post('/vehicles/bac5188f-67c6-4965-81dc-4ef49622e280/locations')
      .send({
        lat: 52.52,
        lng: 13.402,
        at: '20200-05-01T10:00:00Z',
      });
    const responseBody = {
      statusCode: 400,
      error: 'Bad Request',
      message: '"at" must be a valid date',
      validation: { source: 'body', keys: ['at'] },
    };
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual(responseBody);
    done();
  });

  it('Should return 404 for a Location out of the City Boundaries', async done => {
    const response = await request
      .post('/vehicles/bac5188f-67c6-4965-81dc-4ef49622e280/locations')
      .send({
        lat: 56.52,
        lng: 15.402,
        at: new Date(),
      });
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      message: 'Out Of The City Boundaries',
    });
    done();
  });
});

describe('DELETE /vehicles/:id/locations', () => {
  beforeAll(async () => {
    await request
      .post('/vehicles')
      .send({ id: 'bac5188f-67c6-4965-81dc-4ef49622e280' });
  });

  it('Should return 204 after de-registering a Vehicle', async done => {
    const response = await request
      .delete('/vehicles/bac5188f-67c6-4965-81dc-4ef49622e280')
      .send();

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
    done();
  });

  it('Should return 404 for a Unregistered Vehicle', async done => {
    const response = await request
      .delete('/vehicles/bac5188f-67c6-4965-81dc-4ef49622e280')
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'Vehicle Not Registered' });
    done();
  });
});
