const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  _id: {
    type: String,
  },
  administration: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: false,
  },
  repairType: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'Uncompleted',
  },
  closeTime: {
    type: Date,
  },
  note: {
    type: String,
    default: 'لا يوجد ملاحظة',
  },
  engineerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  engineerFullName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Ticket', ticketSchema);
