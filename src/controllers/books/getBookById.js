const { Book } = require('../../models');

const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    // const book = Book.find((b) => b.id === bookId);
    const book = await Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        book
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    });
  }
};

module.exports = getBookById;