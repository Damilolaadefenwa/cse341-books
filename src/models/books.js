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

export { getAllBooks, getBookById };