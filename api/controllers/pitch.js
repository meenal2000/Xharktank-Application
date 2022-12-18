const Pitch = require('../models/pitch');
const mongoose = require('mongoose');
const Offer = require('../models/offer');

exports.createPitch = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Pitch not found");
     }
   const pitch = new Pitch({
        _id : mongoose.Types.ObjectId(),
        entrepreneur : req.body.entrepreneur,
        pitchTitle : req.body.pitchTitle,
        pitchIdea : req.body.pitchIdea,
        askAmount : req.body.askAmount,
        equity : req.body.equity,
        date: new Date()
    });
    pitch
    .save()
    .then( result => {
        res.status(201).json({
            id : result._id
        })
    })
    .catch( err => {
        res.status(400).json({
            error : err
        });
    });
};

exports.createOffer = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(404).send("Bad request");
     }
    const id = req.params.pitchId; 
    const offer = new Offer(req.body);
    offer
    .save()
    .then( offerCreated => {
        Pitch.findById(id, function (err, pitch) {
            if(err){
                res.status(400).json({
                    Err : err,
                    message : "Invalid Request Body"
                })
            }
            else{
                Pitch.findByIdAndUpdate({_id : id},
                    { "$push": { "offers": offerCreated } },
                    { "new": true},
                    function (err, pitch) {
                        if (err) {
                            res.status(400).json({
                                Err : err,
                                message : "Invalid Request Body"
                            })
                        }
                        else{
                            res.status(201).json({
                                id : offerCreated._id,
                            });
                        }
                    });
                }
        });
    })
    .catch( err => {
        res.status(400).json({
            error : err
        });
    });
    
}

exports.getAllPitches = (req, res, next) => {
    Pitch.find().sort([['date', -1]])
    .then(pitch => {
        let newPitches = [];
        for(let i = 0; i < pitch.length; i++) {
            let offers = [];
            for(let j = 0; j < pitch[i].offers.length ; j++){
                let offer = {
                    "id" : pitch[i].offers[j]._id,
                    "investor" : pitch[i].offers[j].investor,
                    "amount" : pitch[i].offers[j].amount,
                    "equity" : pitch[i].offers[j].equity,
                    "comment" : pitch[i].offers[j].comment
                }
                offers.push(offer);
            }
            let obj = 
                {
                    "id" : pitch[i]._id,
                    "entrepreneur" : pitch[i].entrepreneur,
                    "pitchTitle" : pitch[i].pitchTitle,
                    "pitchIdea" : pitch[i].pitchIdea,
                    "askAmount" : pitch[i].askAmount,
                    "equity" : pitch[i].equity,
                    "offers" : offers
                }
            newPitches.push(obj);
        }
        res.status(200).json(newPitches)
    }).catch(err => {
        res.status(404).json({
            err : err,
        })
    });
}

exports.getPitchById = (req , res, next) => {
    const id = req.params.pitchId;
    Pitch.findOne( { _id: id } , (err , pitch) => {
        if (err || !pitch){
            return res.status(404).send("Pitch not found");
          } else {
            let offers = [];
            for(let j = 0; j < pitch.offers.length ; j++){
                let offer = {
                    "id" : pitch.offers[j]._id,
                    "investor" : pitch.offers[j].investor,
                    "amount" : pitch.offers[j].amount,
                    "equity" : pitch.offers[j].equity,
                    "comment" : pitch.offers[j].comment
                }
                offers.push(offer);
            }
            const newPitch = {
                "id" : pitch._id,
                "entrepreneur" : pitch.entrepreneur,
                "pitchTitle" : pitch.pitchTitle,
                "pitchIdea" : pitch.pitchIdea,
                "askAmount" : pitch.askAmount,
                "equity" : pitch.equity,
                "offers" : offers
            };
            if (!newPitch) {
                return res.status(404).send("Pitch not found");
            }
            res.status(200).send(newPitch)
          }
    });
}
