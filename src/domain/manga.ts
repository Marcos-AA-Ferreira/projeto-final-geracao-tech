export interface Manga {
  id: string;
  title: string;
  author: string;
  chapters: number;
  status: 'Lendo' | 'Completo' | 'Eu planejo ler' | 'interrompido';
}

export class MangaDomain {
  static validate(manga: Omit<Manga, 'id'>): void {
    if (!manga.title || manga.title.trim() === '') {
      throw new Error('O título do mangá é obrigatório.');
    }
    if (!manga.author || manga.author.trim() === '') {
      throw new Error('O autor do mangá é obrigatório.');
    }
    if (manga.chapters < 0) {
      throw new Error('O número de capítulos não pode ser negativo.');
    }
  }
}