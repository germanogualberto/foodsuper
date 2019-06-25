const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  }
});

module.exports = () =>
  mongoose.model('User').discriminator('Client', ClientSchema);
