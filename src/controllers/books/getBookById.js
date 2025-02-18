const { Book, User } = require('../../models'); // Pastikan User juga di-import

const getBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    // Cari buku berdasarkan bookId
    const book = await Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
    }

    // Cari user berdasarkan user_id yang ada di buku
    const user = await User.findOne({ where: { id: book.user_id } });

    // Jika user ditemukan, gabungkan informasi user ke dalam response
    if (user) {
      return res.status(200).json({
        status: 'success',
        data: {
          book,
          userName: user.name, // Menampilkan nama user
        },
      });
    } else {
      // Jika user tidak ditemukan, hanya tampilkan buku
      return res.status(200).json({
        status: 'success',
        data: {
          book,
          userName: null, // Jika user tidak ada, bisa kirim null
        },
      });
    }
    
  } catch (error) {
    next(error);
  }
};

module.exports = getBookById;
