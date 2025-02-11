const bcrypt = require('bcrypt');
const { User, Role } = require('../../models');

const register = async (req, res, next) => {
  try {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field harus diisi',
      });
    }

    const name = req.body.name.trim();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    if (password.length < 8) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password harus terdiri dari minimal 8 karakter',
      });
    }

    const findEmail = await User.findOne({ where: { email } });

    if (findEmail) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email sudah ada, gunakan yang lain',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const defaultRoleId = 2;

    // Pastikan role_id valid
    const roleExists = await Role.findByPk(defaultRoleId);
    if (!roleExists) {
      return res.status(400).json({
        status: 'fail',
        message: 'Role tidak ditemukan, hubungi admin',
      });
    }

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
        id: created.id,
        name: created.name,
        email: created.email,
        role: roleExists.name, // Ambil nama role
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
