import express from "express";
import { Book } from "../models/BookModel.js";

const router = express.Router();
 
//route for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Missing required fields");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (e) {
    console.error("Error saving book:", e);
    res.status(500).send("Error saving book");
  }
});

//route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (e) {
    console.error("Error getting books:", e);
    res.status(500).send("Error getting books");
  }
});

//route to get a particular book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    console.error("Error getting this book:", e);
    res.status(500).send("Error getting this book");
  }
});

//route to update a particular book by ID
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Missing required fields");
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (e) {
    console.error("Error getting this book:", e);
    res.status(500).send("Error getting this book");
  }
});

//route to delete a particular book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(204).send("Deleted the book successfully");
  } catch (e) {
    console.error("Error deleting book:", e);
    res.status(500).send("Error deleting book");
  }
});


export default router;