const mongoose = require('mongoose')

const pitchSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    },
    entrepreneur : { type : String , required : true},
    pitchTitle :{ type : String},
    pitchIdea : { type : String},
    askAmount : { type : Number},
    equity : { type : Number, max : 100},
    offers : [{   
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        investor: {
            type: String,
            required : true
        },
        amount: {
            type: Number
        },
        equity: {
            type: Number,
            max: 100
        },
        comment: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Pitch', pitchSchema);
