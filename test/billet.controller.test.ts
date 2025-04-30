import request from 'supertest';
import app from '../src/index';

describe('Billet Controller', () => {
  let token: string;
  let billetId: number;
  let userId: number;

  beforeAll(async () => {
    const response = await request(app).get('/user/login').send({
      email: 'patapim@example.com', // User with role: Master
      password: 'secret'
    });
    expect(response.status).toBe(200);
    token = response.body;
  });

  it('should create a billet', async () => {
    const response = await request(app)
      .post('/billet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        valueToPay: 10000,
        payDay: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        userId: 1
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatch('created');
  });

  it('should list all billets', async () => {
    const response = await request(app).get('/billet');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    billetId = response.body[0].id;
  });

  it('should list a billet by id', async () => {
    const response = await request(app).get(`/billet/${billetId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');

    userId = response.body.userId;
  });

  it('should list all billets by userId', async () => {
    const response = await request(app).get(`/billet/byUserId/${userId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a billet', async () => {
    const response = await request(app)
      .patch(`/billet/${billetId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        valueToPay: 9999
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatch('updated');
  });

  it('should delete a billet', async () => {
    const response = await request(app)
      .delete(`/billet/${billetId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatch('deleted');
  });
});
