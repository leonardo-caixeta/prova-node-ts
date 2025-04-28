import request from 'supertest';
import app from '../src/index';

describe('Role Controller', () => {
  let roleId: number;
  const randomRoleName = `Supervisor_${Date.now()}`;

  it('deve criar uma nova role', async () => {
    const response = await request(app)
      .post('/role')
      .send({
        name: randomRoleName
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toMatch('created');
    const toGetid = await request(app).get(`/role/byName/${randomRoleName}`);
    roleId = toGetid.body.message.id
  });

  it('deve listar todas as roles', async () => {
    const response = await request(app)
      .get('/role')

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.message)).toBe(true);
  });

  it('deve buscar uma role por ID', async () => {
    const response = await request(app)
      .get(`/role/${roleId}`)

    expect(response.status).toBe(200);
    expect(response.body.message).toHaveProperty('id');
  });

  it('deve atualizar uma role', async () => {
    const response = await request(app)
      .patch(`/role/${roleId}`)
      .send({
        name: 'Supervisor Atualizado'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch('Role name updated to');
  });

  it('deve deletar uma role', async () => {
    const response = await request(app)
      .delete(`/role/${roleId}`)

    expect(response.status).toBe(200);
    expect(response.body).toContain(`Role with id: ${roleId} was deleted`);
  });
});
