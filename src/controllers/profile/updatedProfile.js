const { User } = require('../../models');

const updatedProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email, ava, gender, date_of_birthday } = req.body;

    if (!name || !email || !ava || !gender || !date_of_birthday) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field harus diisi.',
      });
    }

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User tidak ditemukan',
      });
    }

    const updatedUser = await user.update({
      name,
      email,
      ava,
      gender,
      date_of_birthday,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Profil berhasil diperbarui',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updatedProfile;
