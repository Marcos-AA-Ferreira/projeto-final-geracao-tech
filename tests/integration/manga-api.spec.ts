import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../src/server';

describe('API Integration Tests - Manga Library CRUD', () => {
  it('deve retornar status UP no health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'UP' });
  });

  it('deve realizar o fluxo completo de CRUD (Criar, Buscar por ID, Atualizar e Deletar)', async () => {
    // 1. Criar Mangá (POST)
    const createResponse = await request(app)
      .post('/mangas')
      .send({
        title: 'Hunter x Hunter',
        author: 'Yoshihiro Togashi',
        chapters: 400,
        status: 'Lendo',
      });

    expect(createResponse.status).toBe(201);
    const mangaId = createResponse.body.id;
    expect(mangaId).toBeDefined();

    // 2. Buscar por ID (GET /mangas/:id)
    const getByIdResponse = await request(app).get(`/mangas/${mangaId}`);
    expect(getByIdResponse.status).toBe(200);
    expect(getByIdResponse.body.title).toBe('Hunter x Hunter');

    // 3. Atualizar Mangá (PUT /mangas/:id)
    const updateResponse = await request(app)
      .put(`/mangas/${mangaId}`)
      .send({
        chapters: 410,
        status: 'Completo',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.chapters).toBe(410);
    expect(updateResponse.body.status).toBe('Completo');

    // 4. Deletar Mangá (DELETE /mangas/:id)
    const deleteResponse = await request(app).delete(`/mangas/${mangaId}`);
    expect(deleteResponse.status).toBe(204);

    // 5. Validar que o registro foi removido (GET /mangas/:id deve retornar 404)
    const getAfterDelete = await request(app).get(`/mangas/${mangaId}`);
    expect(getAfterDelete.status).toBe(404);
  });

  it('deve retornar 404 ao tentar buscar, atualizar ou deletar um mangá inexistente', async () => {
    const fakeId = 'uuid-falso-inexistente';

    const resGet = await request(app).get(`/mangas/${fakeId}`);
    expect(resGet.status).toBe(404);

    const resPut = await request(app).put(`/mangas/${fakeId}`).send({ chapters: 10 });
    expect(resPut.status).toBe(404);

    const resDel = await request(app).delete(`/mangas/${fakeId}`);
    expect(resDel.status).toBe(404);
  });
});