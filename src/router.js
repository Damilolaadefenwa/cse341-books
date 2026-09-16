import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from './controllers/authors.js';

const router = express.Router();

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


/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Unable to retrieve books
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/books/:id', getBookByIdHandler);

export default router;