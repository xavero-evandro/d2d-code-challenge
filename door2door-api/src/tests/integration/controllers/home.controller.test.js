/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../../../app';

const request = supertest(app);

describe('GET /', () => {
  it('should return 302 redirect', async done => {
    const res = await request.get('/');
    expect(res.status).toBe(302);
    done();
  });
});

describe('GET /status', () => {
  it('should return 200 with Status Message', async done => {
    const res = await request.get('/status');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Cars Service ok 🏎💨');
    done();
  });
});
