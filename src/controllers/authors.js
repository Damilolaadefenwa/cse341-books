
import {
  getAllAuthors as getAllAuthorsFromDb,
  getAuthorById as getAuthorByIdFromDb,
  createAuthor as createAuthorFromDb,
  updateAuthor as updateAuthorFromDb,
  deleteAuthor as deleteAuthorFromDb,
  authorHasBooks
} from '../models/authors.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve authors' });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await getAuthorByIdFromDb(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve author' });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;

    if (!id || !name || birthYear === undefined || birthYear === null || birthYear === '') {
      return res.status(400).json({
        message: 'Missing required fields: id, name, and birthYear are required'
      });
    }

    if (typeof birthYear !== 'number' || isNaN(birthYear)) {
      return res.status(400).json({ message: 'birthYear must be a valid number' });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author with this id already exists' });
    }

    const newAuthor = { id, name, birthYear };
    const createdAuthor = await createAuthorFromDb(newAuthor);
    return res.status(201).json(createdAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create author' });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthYear } = req.body;

    if (!name || birthYear === undefined || birthYear === null || birthYear === '') {
      return res.status(400).json({
        message: 'Missing required fields: name and birthYear are required'
      });
    }

    if (typeof birthYear !== 'number' || isNaN(birthYear)) {
      return res.status(400).json({ message: 'birthYear must be a valid number' });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const updatedAuthor = await updateAuthorFromDb(id, { name, birthYear });
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update author' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAuthor = await getAuthorByIdFromDb(id);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const hasBooks = await authorHasBooks(id);
    if (hasBooks) {
      return res.status(400).json({
        message: 'Cannot delete author because associated books exist'
      });
    }

    await deleteAuthorFromDb(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete author' });
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};