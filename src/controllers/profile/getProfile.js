const { User } = require('../../models');

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'ava', 'gender', 'date_of_birthday', 'role_id']
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User tidak ditemukan'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;