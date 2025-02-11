const { BlacklistToken } = require('../../models');

const logout = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not authorized!',
      });
    }

    const token = authHeader.split(" ")[1];

    // Simpan token ke blacklist
    await BlacklistToken.create({ token });

    return res.status(200).json({
      status: 'success',
      message: 'Logout berhasil',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
