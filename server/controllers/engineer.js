const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const { HttpError } = require('../models/http-error');

const Ticket = require('../models/ticket');
const { formatDateAndTime } = require('../utils/date');

exports.getTickets = async (req, res, next) => {
  const { engineerId } = req.params;

  let loadedTickets;
  try {
    loadedTickets = await Ticket.find({ engineerId: engineerId })
      .populate('engineerId')
      .populate('userId')
      .sort({ _id: -1 });
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

      const { formattedDate, formattedTime } = formatDateAndTime(
        ticketSeralized.startTime
      );

      let ticketEndDate;
      let ticketEndTime;

      if (ticketSeralized.closeTime) {
        const { formattedDate, formattedTime } = formatDateAndTime(
          ticketSeralized.closeTime
        );
        
        ticketEndDate = formattedDate;
        ticketEndTime = formattedTime;
      }

      const engineerName = `${ticket.engineerId.firstName} ${ticket.engineerId.secondName}`;
      const userFullName = `${ticket.userId.firstName} ${ticket.userId.secondName}`;

      return {
        ...ticketSeralized,
        engineerName,
        userFullName,
        startDate: formattedDate,
        startTime: formattedTime,
        closeDate: ticketEndDate ? ticketEndDate : ticket.closeTime,
        closeTime: ticketEndTime ? ticketEndTime : ticket.closeTime,
      };
    }),
  });
};

exports.updateTicketStatus = async (req, res, next) => {
  const { status, closeTime, note } = req.body;
  const { ticketId } = req.params;

  try {
    await Ticket.findByIdAndUpdate(ticketId, { status, closeTime, note });
  } catch (err) {
    const error = new HttpError(
      'Updating ticket failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: 'Ticket information updated successfully.',
  });
};
