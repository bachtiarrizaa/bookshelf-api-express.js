'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // jika memliki relasi dengan tabel lain
    }
  }
  Book.init({
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    author: DataTypes.STRING,
    summary: DataTypes.TEXT,
    publisher: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    readPage: DataTypes.INTEGER,
    finished: DataTypes.BOOLEAN,
    reading: DataTypes.BOOLEAN,
    insertedAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};