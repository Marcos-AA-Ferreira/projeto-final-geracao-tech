import { describe, it, expect, beforeEach } from 'vitest';
import { MangaDomain } from '../../src/domain/manga';
import { InMemoryMangaRepository } from '../../src/repositories/manga-repository';

describe('MangaDomain - Testes Unitários', () => {
  it('deve validar com sucesso um mangá válido', () => {
    const validManga = {
      title: 'One Piece',
      author: 'Eiichiro Oda',
      chapters: 1100,
      status: 'Lendo' as const,
    };

    expect(() => MangaDomain.validate(validManga)).not.toThrow();
  });

  it('deve lançar erro se o título estiver vazio', () => {
    const invalidManga = {
      title: '',
      author: 'Eiichiro Oda',
      chapters: 100,
      status: 'Lendo' as const,
    };

    expect(() => MangaDomain.validate(invalidManga)).toThrowError(
      'O título do mangá é obrigatório.'
    );
  });

  it('deve lançar erro se o número de capítulos for negativo', () => {
    const invalidManga = {
      title: 'Bleach',
      author: 'Tite Kubo',
      chapters: -5,
      status: 'plan_to_read' as const,
    };

    expect(() => MangaDomain.validate(invalidManga)).toThrowError(
      'O número de capítulos não pode ser negativo.'
    );
  });
});

describe('InMemoryMangaRepository - Testes Unitários', () => {
  let repository: InMemoryMangaRepository;

  beforeEach(() => {
    repository = new InMemoryMangaRepository();
  });

  it('deve atualizar um mangá existente com sucesso', async () => {
    await repository.create({
      id: '1',
      title: 'Naruto',
      author: 'Masashi Kishimoto',
      chapters: 700,
      status: 'Completo',
    });

    const updated = await repository.update('1', { chapters: 720, status: 'Lendo' });
    
    expect(updated).not.toBeNull();
    expect(updated?.chapters).toBe(720);
    expect(updated?.status).toBe('Lendo');
    expect(updated?.title).toBe('Naruto'); // Mantém os campos não alterados
  });

  it('deve retornar null ao tentar atualizar mangá inexistente', async () => {
    const updated = await repository.update('999', { chapters: 10 });
    expect(updated).toBeNull();
  });

  it('deve deletar um mangá com sucesso', async () => {
    await repository.create({
      id: '1',
      title: 'Death Note',
      author: 'Tsugumi Ohba',
      chapters: 108,
      status: 'Completo',
    });

    const deleted = await repository.delete('1');
    expect(deleted).toBe(true);

    const all = await repository.findAll();
    expect(all.length).toBe(0);
  });

  it('deve retornar false ao tentar deletar mangá inexistente', async () => {
    const deleted = await repository.delete('999');
    expect(deleted).toBe(false);
  });
});