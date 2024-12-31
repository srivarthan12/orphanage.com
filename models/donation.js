const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);