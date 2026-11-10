import { describe, it, expect, beforeEach } from 'vitest';
import { MangaDomain } from '../../src/domain/manga';
import { InMemoryMangaRepository } from '../../src/repositories/manga-repository';

describe('MangaDomain - Casos de Falha Adicionais (Validações de Domínio)', () => {
  it('deve falhar ao tentar validar um mangá com título em branco ou vazio', () => {
    const mangaComTituloVazio = {
      title: '   ',
      author: 'Eiichiro Oda',
      chapters: 100,
      status: 'Lendo' as const,
    };

    expect(() => MangaDomain.validate(mangaComTituloVazio as any)).toThrowError(
      'O título do mangá é obrigatório.'
    );
  });

  it('deve falhar ao tentar validar um mangá com número de capítulos altamente negativo', () => {
    const mangaComCapituloNegativo = {
      title: 'Berserk',
      author: 'Kentaro Miura',
      chapters: -42,
      status: 'Eu planejo ler' as const,
    };

    expect(() => MangaDomain.validate(mangaComCapituloNegativo)).toThrowError(
      'O número de capítulos não pode ser negativo.'
    );
  });
});

describe('InMemoryMangaRepository - Casos de Falha e Borda', () => {
  let repository: InMemoryMangaRepository;

  beforeEach(() => {
    repository = new InMemoryMangaRepository();
  });

  it('deve retornar null ao tentar buscar um ID que não existe na base', async () => {
    const resultado = await repository.findById('id-inexistente-uuid-999');
    expect(resultado).toBeNull();
  });

  it('deve retornar null ao tentar atualizar um mangá que não está cadastrado', async () => {
    const resultado = await repository.update('id-fantasma', {
      title: 'Novo Título',
    });
    expect(resultado).toBeNull();
  });

  it('deve retornar false ao tentar deletar um mangá inexistente', async () => {
    const deletado = await repository.delete('id-fantasma-para-deletar');
    expect(deletado).toBe(false);
  });

  it('não deve alterar dados originais de outros mangás ao falhar ou atualizar um ID específico', async () => {
    // Cadastra um mangá válido
    await repository.create({
      id: 'manga-01',
      title: 'Bleach',
      author: 'Tite Kubo',
      chapters: 686,
      status: 'Completo',
    });

    // Tenta atualizar um ID que não existe
    await repository.update('manga-99', { chapters: 100 });

    // Garante que o mangá original permaneceu intacto
    const mangaOriginal = await repository.findById('manga-01');
    expect(mangaOriginal?.chapters).toBe(686);
    expect(mangaOriginal?.title).toBe('Bleach');
  });
});