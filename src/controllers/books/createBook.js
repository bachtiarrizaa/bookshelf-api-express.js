// const { Book } = require('../../models');
// const { nanoid } = require('nanoid');

// const createBook = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const { 
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       reading
//     } = req.body;

//     if (!name) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'Gagal menambahkan buku. Mohon isi nama buku',
//       });
//     }

//     if (readPage > pageCount) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
//       });
//     }

//     const newBook = await Book.create({
//       id: nanoid(16),
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       finished: pageCount === readPage,
//       reading,
//       user_id: userId,
//       insertedAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     });

//     return res.status(201).json({
//       status: 'success',
//       message: 'Buku berhasil ditambahkan',
//       data: {
//         bookId: newBook.id
//       },
//     });
//   } catch (error) {
//     // console.error(error);
//     // return res.status(500).json({
//     //   status: 'error',
//     //   message: 'Terjadi kesalahan pada server',
//     // });
//     next(error);
//   }
// };

// module.exports = createBook;


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

    // Cek apakah user sudah login
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized! User not found.',
      });
    }

    // Validasi input
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

    // Buat buku dengan user_id dari token
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
      user_id: req.user.id,  // User ID dari token JWT
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name"],  // Ambil ID & Nama User
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
