import { Router } from "express";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const router = Router();

router.get("/books", getBooks);
router.post("/book", addBook);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

export default router;
