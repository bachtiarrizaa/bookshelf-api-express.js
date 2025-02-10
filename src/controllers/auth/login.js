const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Email tidak ditemukan'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'fail',
        message: 'Password salah'
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      status: 'success',
      message: 'berhasil login',
      data: payload,
      token,
    });
  } catch (error) {
    next(error);
  };
}

module.exports = login;