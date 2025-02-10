const { Book } = require('../../models');

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
    console.error(error)
    return res.status(500).jdon({
      status: 'fai;',
      message: 'Terjadi kesalahan pada server',
    });
  }
};

module.exports = getAllBooks;
