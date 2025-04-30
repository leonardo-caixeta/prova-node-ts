import request from 'supertest';
import app from '../src/index';

describe('Role Controller', () => {
  let token: string;
  let roleId: number;
  const randomRoleName = `Supervisor_${Date.now()}`;

  beforeAll(async () => {
    const response = await request(app).get('/user/login').send({
      email: 'patapim@example.com', // User with role: Master
      password: 'secret'
    });
    expect(response.status).toBe(200);
    token = response.body;
  });

  it('should create new role', async () => {
    const response = await request(app).post('/role').send({
      name: randomRoleName
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatch('created');
    const toGetid = await request(app).get(`/role/byName/${randomRoleName}`);
    roleId = toGetid.body.id;
  });

  it('should list all roles', async () => {
    const response = await request(app).get('/role');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should list one role by id', async () => {
    const response = await request(app).get(`/role/${roleId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should list one role by name', async () => {
    const response = await request(app).get(`/role/byName/${randomRoleName}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
  });

  it('should update role name', async () => {
    const response = await request(app)
      .patch(`/role/${roleId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Supervisor Atualizado'
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatch('Role name updated to');
  });

  it('should delete a role', async () => {
    const response = await request(app)
      .delete(`/role/${roleId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toContain(`Role with id: ${roleId} was deleted`);
  });
});
