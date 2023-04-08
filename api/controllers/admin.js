const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const { HttpError } = require('../models/http-error');

const Ticket = require('../models/ticket');
const User = require('../models/user');

exports.addUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const {
    firstName,
    secondName,
    userName,
    userCode,
    specialization,
    isAdmin,
    isEngineer,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName });
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again later.',
      500
    );
    return next(error);
  }

  // User already exists with this userName
  if (existingUser) {
    const error = new HttpError(
      'User with this userName already exists, please choose a unique userName.',
      422
    );
    res.status(200).json({
      message: 'يوجد مسخدم بنفس اسم المشغل , برجاء استخدام اسم مشغل جديد',
    });
    return next(error);
  }

  const newUser = new User({
    firstName,
    secondName,
    userName,
    userCode,
    isAdmin,
    isEngineer,
    specialization,
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError('Creating user failed, please try again.', 500);
    return next(error);
  }
  res.status(201).json({ message: 'User created!', userId: newUser._id });
};

exports.getUsers = async (req, res, next) => {
  let loadedUsers;
  try {
    loadedUsers = await User.find({}).sort({ _id: -1 });
  } catch (err) {
    const error = new HttpError(
      'Fetching Users failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedUsers || loadedUsers.length === 0) {
    return next(new HttpError('Could not find Users.', 404));
  }

  res.status(200).json({
    users: loadedUsers.map((user) => user.toObject({ getters: true })),
  });
};

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;

  let loadedUser;
  try {
    loadedUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Finding user failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedUser) {
    const error = new HttpError('No Such User.', 404);
    return next(error);
  }
  res.status(200).json({ user: loadedUser.toObject({ getters: true }) });
};

exports.updateUser = async (req, res, next) => {
  const { firstName, secondName, specialization } = req.body;
  const { userId } = req.params;

  let loadedUser;
  try {
    loadedUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Finding user failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedUser) {
    const error = new HttpError('No Such user found.', 404);
    return next(error);
  }

  loadedUser.firstName = firstName;
  loadedUser.secondName = secondName;
  loadedUser.specialization = specialization;

  try {
    await loadedUser.save();
  } catch (err) {
    const error = new HttpError(
      'Updating the user failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: 'User information updated successfully.',
    userId: loadedUser._id,
  });
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete({ _id: userId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete user.',
      500
    );
    return next(error);
  }
  res.status(200).json({ message: 'Deleted the user successfully.' });
};

exports.getTickets = async (req, res, next) => {
  let loadedTickets;
  try {
    loadedTickets = await Ticket.find({})
      .sort({ startTime: -1 })
      .populate('engineerId')
      .populate('userId');
  } catch (err) {
    const error = new HttpError(
      'Fetching tickets failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedTickets || loadedTickets.length === 0) {
    return next(new HttpError('Could not find tickets.', 404));
  }

  res.status(200).json({
    tickets: loadedTickets.map((ticket) => {
      const ticketSeralized = ticket.toObject({ getters: true });

      // const engineerName = `${ticket.engineerId?.firstName} ${ticket.engineerId?.secondName}`;
      // const userFullName = `${ticket.userId?.firstName} ${ticket.userId?.secondName}`;

      return {
        ...ticketSeralized,
        startDate: ticket.startTime,
        startTime: ticket.startTime,
        closeDate: ticket.closeTime ? ticket.closeTime : undefined,
        closeTime: ticket.closeTime ? ticket.closeTime : undefined,
      };
    }),
  });
};

exports.getRepairTypeValues = async (req, res, next) => {
  let loadedTickets;
  try {
    loadedTickets = await Ticket.find({}).select('repairType');
  } catch (err) {
    const error = new HttpError(
      'Fetching tickets failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedTickets || loadedTickets.length === 0) {
    return next(new HttpError('Could not find tickets.', 404));
  }

  const repairTypes = loadedTickets.map((ticket) => ticket.repairType);

  const values = repairTypes.reduce((type, curr) => {
    return type[curr] ? type[curr]++ : (type[curr] = 1), type;
  }, {});

  const pieData = [];
  for (const [key, value] of Object.entries(values)) {
    const obj = {
      id: key,
      label: key,
      value: value,
    };

    pieData.push(obj);
  }

  res.status(200).json({ pieData });
};

exports.getAdministrationValues = async (req, res, next) => {
  let loadedTickets;
  try {
    loadedTickets = await Ticket.find({}).select('administration');
  } catch (err) {
    const error = new HttpError(
      'Fetching tickets failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedTickets || loadedTickets.length === 0) {
    return next(new HttpError('Could not find tickets.', 404));
  }

  const administrationTypes = loadedTickets.map(
    (ticket) => ticket.administration
  );

  const values = administrationTypes.reduce((type, curr) => {
    return type[curr] ? type[curr]++ : (type[curr] = 1), type;
  }, {});

  const pieData = [];
  for (const [key, value] of Object.entries(values)) {
    const obj = {
      id: key,
      label: key,
      value: value,
    };

    pieData.push(obj);
  }

  res.status(200).json({ pieData });
};

exports.getBarChartData = async (req, res, next) => {
  let loadedTickets;
  try {
    loadedTickets = await Ticket.find({}).select('administration repairType');
  } catch (err) {
    const error = new HttpError(
      'Fetching tickets failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedTickets || loadedTickets.length === 0) {
    return next(new HttpError('Could not find tickets.', 404));
  }

  const lookUp = {};

  loadedTickets.forEach((ticket) => {
    lookUp[ticket.repairType] = lookUp[ticket.repairType] || {};

    if (lookUp[ticket.repairType][ticket.administration]) {
      lookUp[ticket.repairType][ticket.administration] += 1;
    } else {
      lookUp[ticket.repairType][ticket.administration] = 1;
    }
  });

  const barData = [];
  for (const [key, value] of Object.entries(lookUp)) {
    const obj = {
      repairType: key,
      ...value,
    };

    barData.push(obj);
  }

  res.status(200).json({ barData });
};

exports.getTicketsNumberInfo = async (req, res, next) => {
  let totalTicketsNumber;
  let completedTicketsNumber;
  let unCompletedTicketsNumber;
  try {
    totalTicketsNumber = await Ticket.countDocuments();
    completedTicketsNumber = await Ticket.countDocuments({
      status: 'Completed',
    });
    unCompletedTicketsNumber = await Ticket.countDocuments({
      status: 'Uncompleted',
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching number info of tickets failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    ticketsInfo: {
      totalTicketsNumber,
      completedTicketsNumber,
      unCompletedTicketsNumber,
    },
  });
};
