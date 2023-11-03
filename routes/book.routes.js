const express = require("express");
const { connection } = require("../db");
const { BookModel } = require("../model/book.model");
const cors = require("cors");

const bookRouter = express.Router();
bookRouter.use(express.json());

bookRouter.post("/add", async (req, res) => {
  try {
    let payload = req.body;
    const book = new BookModel(payload);
    await book.save();
    res.status(201).json({ msg: "New Book Added" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to add a new book", message: error.message });
  }
});

bookRouter.get("/", async (req, res) => {
  try {
    const { author } = req.query;
    let query = {};

    if (author) {
      query.author = { $regex: new RegExp(author, "i") };
    }

    const books = await BookModel.find(query);

    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add a new book", message: error.message });
  }
});

bookRouter.get("/:id", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch the book", message: error.message });
  }
});

bookRouter.patch("/:id", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedData = req.body;
    Object.assign(book, updatedData);

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch the book", message: error.message });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await book.deleteOne();
    res.status(200).json({ msg: "Book deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch the book", message: error.message });
  }
});

module.exports = { bookRouter };
