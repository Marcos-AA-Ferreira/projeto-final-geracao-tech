import { Manga } from '../domain/manga';

export interface IMangaRepository {
  findAll(): Promise<Manga[]>;
  findById(id: string): Promise<Manga | null>;
  create(manga: Manga): Promise<Manga>;
  update(id: string, manga: Partial<Manga>): Promise<Manga | null>;
  delete(id: string): Promise<boolean>;
}

export class InMemoryMangaRepository implements IMangaRepository {
  private mangas: Manga[] = [];

  async findAll(): Promise<Manga[]> {
    return this.mangas;
  }

  async findById(id: string): Promise<Manga | null> {
    return this.mangas.find(m => m.id === id) || null;
  }

  async create(manga: Manga): Promise<Manga> {
    this.mangas.push(manga);
    return manga;
  }

  async update(id: string, updatedData: Partial<Manga>): Promise<Manga | null> {
    const index = this.mangas.findIndex(m => m.id === id);
    if (index === -1) return null;

    this.mangas[index] = {
      ...this.mangas[index],
      ...updatedData,
      id, // Garante que o ID não seja alterado
    };

    return this.mangas[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.mangas.findIndex(m => m.id === id);
    if (index === -1) return false;

    this.mangas.splice(index, 1);
    return true;
  }
}