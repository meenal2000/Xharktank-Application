const express = require('express');
const router = express.Router();
const Pitch = require('../models/pitch');
const mongoose = require('mongoose');
const PitchesController = require('../controllers/pitch');

// POST request to /pitches
router.post('/' , PitchesController.createPitch);

// POST request to /pitches/pitch_id/makeOffer
router.post('/:pitchId/makeOffer' , PitchesController.createOffer);

// GET all the pitches 
router.get('/' , PitchesController.getAllPitches);

// GET a pitch by it's ID
router.get('/:pitchId' , PitchesController.getPitchById);

module.exports = router;