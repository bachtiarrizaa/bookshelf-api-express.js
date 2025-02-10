const { Book } = require('../../models');

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Cari buku berdasarkan ID
    const book = await Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      });
    }

    // Hapus buku dari database
    await book.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    });
  }
};

module.exports = deleteBook;
