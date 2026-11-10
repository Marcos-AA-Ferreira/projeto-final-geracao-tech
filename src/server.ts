import express from 'express';
import { randomUUID } from 'crypto';
import { MangaDomain, Manga } from './domain/manga';
import { InMemoryMangaRepository } from './repositories/manga-repository';

const app = express();
app.use(express.json());

const mangaRepository = new InMemoryMangaRepository();

// Health check
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

// 1. CRIAR (POST /mangas)
app.post('/mangas', async (req, res) => {
  try {
    const { title, author, chapters, status } = req.body;
    
    MangaDomain.validate({ title, author, chapters, status });

    const newManga: Manga = {
      id: randomUUID(),
      title,
      author,
      chapters,
      status: status || 'plan_to_read',
    };

    const created = await mangaRepository.create(newManga);
    return res.status(201).json(created);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// 2. LER TODOS (GET /mangas)
app.get('/mangas', async (req, res) => {
  const mangas = await mangaRepository.findAll();
  return res.json(mangas);
});

// 3. LER POR ID (GET /mangas/:id)
app.get('/mangas/:id', async (req, res) => {
  const { id } = req.params;
  const manga = await mangaRepository.findById(id);
  
  if (!manga) {
    return res.status(404).json({ error: 'Mangá não encontrado.' });
  }
  
  return res.json(manga);
});

// 4. EDITAR / ATUALIZAR (PUT /mangas/:id)
app.put('/mangas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, chapters, status } = req.body;

    const existing = await mangaRepository.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Mangá não encontrado.' });
    }

    const updatedData = {
      title: title !== undefined ? title : existing.title,
      author: author !== undefined ? author : existing.author,
      chapters: chapters !== undefined ? chapters : existing.chapters,
      status: status !== undefined ? status : existing.status,
    };

    MangaDomain.validate(updatedData);

    const updatedManga = await mangaRepository.update(id, updatedData);
    return res.json(updatedManga);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// 5. DELETAR (DELETE /mangas/:id)
app.delete('/mangas/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await mangaRepository.delete(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Mangá não encontrado.' });
  }

  return res.status(204).send();
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export { app };