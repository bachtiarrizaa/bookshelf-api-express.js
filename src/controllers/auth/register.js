const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../../models');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const findEmail = await User.findOne({ where: { email } });

    if (findEmail) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email sudah ada, gunakan yang lain',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password harus terdiri dari minimal 8 karakter',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const defaultRoleId = 2;

    const created = await User.create({
      name,
      email,
      password: hashPassword,
      role_id: defaultRoleId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil melakukan registrasi',
      data: {
        name: created.name,
        email: created.email,
        role_id: created.role_id,
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

module.exports = register;