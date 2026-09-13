import express from "express";
import { getBooksHandler, getBookByIdHandler } from "./controllers/books.js";

const router = express.Router();

//Add a route for GET /books
//use getBooksHandler as well other future one as the controller function for that route
router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);


export default router;

