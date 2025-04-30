import request from 'supertest';
import app from '../src/index';

describe('Billet Controller', () => {
  let token: string;
  let billetId: number;

  beforeAll(async () => {
    const response = await request(app).get('/user/login').send({
      email: 'patapim@example.com', // User with role: Master
      password: 'secret'
    });
    expect(response.status).toBe(200);
    token = response.body.message;
  });

  it('should create a billet', async () => {
    const response = await request(app)
      .post('/billet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        valueToPay: 10000,
        payDay: new Date('2025-07-06'),
        userId: 1
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toMatch('created');
  });
  it('should list all billets', async () => {
    const response = await request(app).get('/billet');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.message));
  });
  it('should list a billet by id', async () => {});
  it('should list all billets by userId', async () => {});
  it('should update a billet', async () => {});
  it('should delete a billet', async () => {});
});
