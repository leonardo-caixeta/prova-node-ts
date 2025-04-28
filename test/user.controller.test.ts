import request from 'supertest';
import app from '../src/index';

describe('User Controller', () => {
  let userId: number;
  let token: string;
  const randomEmail = `test${Date.now()}@test.com`;

  beforeAll(async () => {
    const response = await request(app).get('/user/login').send({
      email: 'crocodillo@example.com',
      password: '123456'
    });
    expect(response.status).toBe(200);
    token = response.body.message;
  });

  it('deve criar um novo usuário', async () => {
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test User',
        email: randomEmail,
        password: '123456',
        cargo: 'Gerente'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toContain('created');

    const toGetid = await request(app)
      .get(`/user/byEmail/${randomEmail}`)
      .set('Authorization', `Bearer ${token}`);
    userId = toGetid.body.message.id;
  });

  it('deve buscar todos os usuários', async () => {
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.message)).toBe(true);
  });

  it('deve buscar um usuário por ID', async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toHaveProperty('email');
  });

  it('deve atualizar um usuário', async () => {
    const response = await request(app)
      .patch(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        email: 'updated@email.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('updated');
  });

  it('deve deletar um usuário', async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('deleted');
  });
});
