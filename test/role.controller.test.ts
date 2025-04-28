import request from 'supertest';
import app from '../src/index';

describe('Role Controller', () => {
  let roleId: number;
  const randomRoleName = `Supervisor_${Date.now()}`;

  it('should create new role', async () => {
    const response = await request(app).post('/role').send({
      name: randomRoleName
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toMatch('created');
    const toGetid = await request(app).get(`/role/byName/${randomRoleName}`);
    roleId = toGetid.body.message.id;
  });

  it('should list all roles', async () => {
    const response = await request(app).get('/role');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.message)).toBe(true);
  });

  it('should list one role by id', async () => {
    const response = await request(app).get(`/role/${roleId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toHaveProperty('id');
  });

  it('should list one role by name', async () => {
    const response = await request(app).get(`/role/byName/${randomRoleName}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toHaveProperty('name');
  });

  it('should update role name', async () => {
    const response = await request(app).patch(`/role/${roleId}`).send({
      name: 'Supervisor Atualizado'
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch('Role name updated to');
  });

  it('should delete a role', async () => {
    const response = await request(app).delete(`/role/${roleId}`);

    expect(response.status).toBe(200);
    expect(response.body).toContain(`Role with id: ${roleId} was deleted`);
  });
});
