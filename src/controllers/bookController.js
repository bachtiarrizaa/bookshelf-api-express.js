const { Book } = require('../models');
const { nanoid } = require('nanoid');

const addBook = async (req, res) => {
  try {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
    }

    if (readPage > pageCount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
    }

    const newBook = await Book.create({
      id: nanoid(16),
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: pageCount === readPage,
      reading,
      insertedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
    });
  }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: ['id', 'name', 'publisher']
        });

        return res.status(200).json({
            status: 'success',
            data: {
                books: books || []
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = { addBook, getAllBooks };
