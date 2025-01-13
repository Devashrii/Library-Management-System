const express = require('express');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const router = express.Router();

// Create a new book (Author only)
router.post('/create', async (req, res) => {
  const { title, authorId, genre, stock } = req.body;
  try {
    const newBook = new Book({ title, author: authorId, genre, stock });
    await newBook.save();
    const author = await User.findById(authorId);
    author.writtenBooks.push(newBook._id);
    await author.save();
    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'name');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author', 'name');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book (Author only)
router.put('/update/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete book (Author only)
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    const author = await User.findById(deletedBook.author);
    author.writtenBooks.pull(deletedBook._id);
    await author.save();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
