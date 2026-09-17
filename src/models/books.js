import { getDb } from "../db/connect.js";

//1. Get all books
const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();
  return books;
};

//2. Retrieve single book by id
const getBookById = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');
  return await collection.findOne({ id: bookId });
};

//3. Create new Book
const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.insertOne(book);
  return book;
};

//4. Update/ Edit book
const updateBook = async (id, book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.updateOne({ id }, { $set: book });
  return { id, ...book };
};

//5. Delete book
const deleteBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  return await collection.deleteOne({ id });
};

//6. Validate an Author 
const authorExists = async (authorId) => {
  const db = getDb();
  const collection = db.collection('authors');
  const author = await collection.findOne({ id: authorId });
  return author !== null;
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists
};

