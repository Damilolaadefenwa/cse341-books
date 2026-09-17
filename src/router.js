import express from 'express';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from './controllers/authors.js';

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from './controllers/books.js';

const router = express.Router();

//1. AUTHORS

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Retrieve all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: An array of author objects
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Retrieve one author by custom id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom author ID
 *     responses:
 *       200:
 *         description: The matching author object
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */
router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *           example:
 *             id: "a1"
 *             name: "Maya Rivera"
 *             birthYear: 1985
 *     responses:
 *       201:
 *         description: Newly created author object
 *       400:
 *         description: Bad Request - Input validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               MissingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   message: "Missing required fields: id, name, and birthYear are required"
 *               InvalidBirthYear:
 *                 summary: Invalid birthYear format
 *                 value:
 *                   message: "birthYear must be a valid number"
 *               DuplicateID:
 *                 summary: Duplicate author ID
 *                 value:
 *                   message: "Author with this id already exists"
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *           example:
 *             name: "Maya Rivera Updated"
 *             birthYear: 1986
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Bad Request - Input validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               MissingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   message: "Missing required fields: name and birthYear are required"
 *               InvalidBirthYear:
 *                 summary: Invalid birthYear format
 *                 value:
 *                   message: "birthYear must be a valid number"
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put('/authors/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom author ID
 *     responses:
 *       204:
 *         description: Author deleted successfully (No Content)
 *       400:
 *         description: Cannot delete author because associated books exist
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to delete author
 */
router.delete('/authors/:id', deleteAuthor);




//2. BOOKS ROUTE

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Return all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Array of book objects
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/books', getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Return a single book by custom id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom book ID
 *     responses:
 *       200:
 *         description: Matching book object
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/books/:id', getBookById);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *           example:
 *             id: "b4"
 *             authorId: "a1"
 *             title: "Example Book Title"
 *             publicationDate: "2026-01-15"
 *     responses:
 *       201:
 *         description: Returns newly created book object
 *       400:
 *         description: Bad Request - Input validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               MissingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   message: "Missing required fields: id, authorId, title, and publicationDate are required"
 *               DuplicateID:
 *                 summary: Duplicate book ID
 *                 value:
 *                   message: "Book with this id already exists"
 *               InvalidAuthorId:
 *                 summary: Invalid author ID
 *                 value:
 *                   message: "Referenced authorId does not exist"
 *       500:
 *         description: Unable to create book
 */
router.post('/books', createBook);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *           example:
 *             authorId: "a2"
 *             title: "Updated Book Title"
 *             publicationDate: "2026-02-20"
 *     responses:
 *       200:
 *         description: Returns updated book object
 *       400:
 *         description: Bad Request - Input validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               MissingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   message: "Missing required fields: authorId, title, and publicationDate are required"
 *               InvalidAuthorId:
 *                 summary: Invalid author ID
 *                 value:
 *                   message: "Referenced authorId does not exist"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Book not found"
 *       500:
 *         description: Unable to Update book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Unable to Update book"
 */
router.put('/books/:id', updateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom book ID
 *     responses:
 *       204:
 *         description: Empty response body
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to delete book
 */
router.delete('/books/:id', deleteBook);

export default router;