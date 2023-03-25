const jwt = require('jsonwebtoken');

const { HttpError } = require('../models/http-error');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  const { userName, userCode } = req.body;

  let loadedUser;

  try {
    loadedUser = await User.findOne({ userName: userName });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedUser) {
    const error = new HttpError('No Such user, could not log you in.', 403);
    res.status(203).json({
      message: 'معلومات تسجيل الدخول خاطئة , حاول مرة أخرى',
    });
    return next(error);
  }

  const isValidPassword = userCode === loadedUser.userCode;

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    res.status(203).json({
      message: 'معلومات تسجيل الدخول خاطئة , حاول مرة أخرى',
    });
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: loadedUser.id, userName: loadedUser.userName },
      'supersecret_dont_share'
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    token: token,
    userId: loadedUser.id,
    userName: loadedUser.userName,
    isAdmin: loadedUser.isAdmin,
    isEngineer: loadedUser.isEngineer,
  });
};
