const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userCode: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  isEngineer: {
    type: Boolean,
    default: false,
    required: true,
  },
  specialization: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema);
