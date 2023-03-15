const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

// const dayjs = require('dayjs');

const { HttpError } = require('../models/http-error');

const Ticket = require('../models/ticket');
const User = require('../models/user');

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

  const newTicket = new Ticket({
    userId,
    engineerId,
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

  let loadedEngineer;
  try {
    loadedEngineer = await User.findById(engineerId);
  } catch (err) {
    const error = new HttpError(
      'Finding Engineer failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!loadedEngineer) {
    const error = new HttpError('No Such Engineer.', 404);
    return next(error);
  }

  res.status(201).json({
    message: 'Ticket created!',
    ticketId: newTicket._id,
    engineerName: `${loadedEngineer.firstName} ${loadedEngineer.secondName}`,
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
