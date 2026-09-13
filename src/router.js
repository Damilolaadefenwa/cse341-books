import express from "express";
import { getBooksHandler } from "./controllers/books.js";

const router = express.Router();

//add a route for GET /books
//use getBooksHandler as the controller function for that route
router.get('/books', getBooksHandler);

export default router;

