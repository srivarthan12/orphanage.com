const express = require('express');
const router = express.Router();
const Essential= require('../models/essentials');


router.get('/', async (req, res) => {
    try {
      const essentials = await Essential.find();
      res.json(essentials);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  //post

  router.post('/', async (req, res) => {
    const essential = new Essential(req.body);
    try {
      const newEssential = await essential.save();
      res.status(201).json(newEssential);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


module.exports=router