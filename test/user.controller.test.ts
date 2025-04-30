import request from 'supertest';
import app from '../src/index';

describe('User Controller', () => {
  let userId: number;
  let token: string;
  const randomEmail = `test${Date.now()}@test.com`;

  beforeAll(async () => {
    const response = await request(app).get('/user/login').send({
      email: 'patapim@example.com', // User with role: Master
      password: 'secret'
    });
    expect(response.status).toBe(200);
    token = response.body;
  });

  it('should create new user', async () => {
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test User',
        email: randomEmail,
        password: '123456',
        cargo: 'Admin'
      });

    expect(response.status).toBe(201);
    expect(response.body).toContain('created');

    const toGetid = await request(app)
      .get(`/user/byEmail/${randomEmail}`)
      .set('Authorization', `Bearer ${token}`);
    userId = toGetid.body.id;
  });

  it('should list all users', async () => {
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('shoul list one user by ID', async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email');
  });

  it('shoul list one user by email', async () => {
    const response = await request(app)
      .get(`/user/byEmail/${randomEmail}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
  });

  it('should update a user', async () => {
    const response = await request(app)
      .patch(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        email: 'updated@email.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toContain('updated');
  });

  it('should delete a user', async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toContain('deleted');
  });
});
