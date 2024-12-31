const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');

//free donation
router.post('/free', async (req, res) => {
  const donation = new Donation(req.body);

  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//essential
router.post('/essential', async (req, res) => {
  const donation = new Donation(req.body);

  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;