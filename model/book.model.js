const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: Number, required: true },
    description: { type: String, required: true },
    published_date: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("book", bookSchema);

module.exports = { BookModel };
