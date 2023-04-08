const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const { validationResult } = require('express-validator');

const { HttpError } = require('../models/http-error');

const Ticket = require('../models/ticket');
const User = require('../models/user');
const ticket = require('../models/ticket');

const getTicketNames = async (userId, engineerId) => {
  // Assign user full name to ticket
  let ticketUser;
  let userFullName;
  try {
    ticketUser = await User.findById(userId);
    userFullName = `${ticketUser.firstName} ${ticketUser.secondName}`;
  } catch (err) {
    console.log(err);
  }

  // Assign engineer full name to ticket
  let engineerUser;
  let engineerFullName;
  try {
    engineerUser = await User.findById(engineerId);
    engineerFullName = `${engineerUser.firstName} ${engineerUser.secondName}`;
  } catch (err) {
    console.log(err);
  }

  return { userFullName, engineerFullName };
};

const isEngineerBusy = async (engineerId) => {
  const today = new Date().toLocaleDateString();

  let loadedTickets;
  try {
    loadedTickets = await Ticket.find({ engineerId: engineerId })
      .sort({ startTime: -1 })
      .limit(3);
  } catch (err) {}

  // const checkIsBusy = (ticket) => {
  //   const { startTime } = ticket;
  //   return startTime.toLocaleDateString() !== today;
  // };

  // const isBusy = loadedTickets.some(checkIsBusy);

  let count = 0;
  loadedTickets.forEach((ticket) => {
    if (ticket.startTime.toLocaleDateString() === today) {
      count++;
    }
  });

  let isBusy = false;
  console.log(count);
  if (count >= 3) {
    isBusy = true;
  }

  console.log(isBusy);

  return isBusy;
};

exports.addTicket = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(HttpError);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { administration, sector, repairType, startTime, userId, engineerId } =
    req.body;

  const isBusy = await isEngineerBusy(engineerId);

  if (isBusy) {
    const error = new HttpError(
      'Engineer selected is not available today.',
      403
    );
    res.status(202).json({
      message: 'عذراً هذا المهندس غير متوفر اليوم , برجاء اختيار مهندس أخر',
    });
    return next(error);
  }

  const uid = new ShortUniqueId({
    dictionary: 'hex',
    length: 5,
  });

  const _id = uid();

  const { userFullName, engineerFullName } = await getTicketNames(
    userId,
    engineerId
  );

  const newTicket = new Ticket({
    _id,
    userId,
    userFullName,
    engineerId,
    engineerFullName,
    administration,
    sector,
    repairType,
    startTime,
  });

  try {
    await newTicket.save();
  } catch (err) {
    const error = new HttpError(
      'Creating Ticket failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: 'Ticket created!',
    ticketId: newTicket._id,
  });
};

exports.getEngineers = async (req, res, next) => {
  let loadedEngineers;
  try {
    loadedEngineers = await User.find({ isEngineer: true });
  } catch (err) {
    const error = new HttpError(
      'Fetching Engineers failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedEngineers || loadedEngineers.length === 0) {
    return next(new HttpError('Could not find Engineers.', 404));
  }

  res.status(200).json({
    engineers: loadedEngineers.map((engineer) => {
      const engineerFullName = `${engineer.firstName} ${engineer.secondName}`;

      return {
        id: engineer._id,
        specialization: engineer.specialization,
        fullName: engineerFullName,
      };
    }),
  });
};
