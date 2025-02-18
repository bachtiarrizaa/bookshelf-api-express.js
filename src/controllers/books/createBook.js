const { Book, User } = require('../../models');
const { nanoid } = require('nanoid');

const createBook = async (req, res, next) => {
  try {
    const { 
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! User not found.',
      });
    }

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
      user_id: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name"],
    });

    return res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
        user: {
          id: user.id,
          name: user.name,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createBook;
