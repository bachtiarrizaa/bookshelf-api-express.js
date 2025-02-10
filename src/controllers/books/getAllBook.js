const { Book } = require('../../models');
const { Sequelize } = require('sequelize');

const getAllBooks = async (req, res) => {
  try {
    const { name, reading, finished } = req.query;

    let whereCondition = {};

    if (name) {
      whereCondition.name = Sequelize.literal(`LOWER(name) LIKE LOWER('%${name}%')`);
    }

    if (reading === '0' || reading === '1') {
      whereCondition.reading = reading === '1';
    }

    if (finished === '0' || finished === '1') {
      whereCondition.finished = finished === '1';
    }

    const books = await Book.findAll({
      attributes: ['id', 'name', 'publisher'],
      where: whereCondition,
    });

    return res.status(200).json({
      status: 'success',
      data: { books: books || [] },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    });
  }
};


module.exports = getAllBooks;
