const { Book } = require('../../models');

const updatedBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
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

    if (!name) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
    }

    if (readPage > pageCount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
    }

    const book = await Book.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
    }

    await book.update ({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      pageCount,
      reading,
      finished: pageCount === readPage,
      updatedat: new Date().toISOString(),
    });

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });

  } catch (error) {
    // console.log(error);
    // return res.status(500).json({
    //   status: 'fail',
    //   message: 'Terjadi kesalahan pada server',
    // });
    next(error);
  }
};

module.exports = updatedBook;