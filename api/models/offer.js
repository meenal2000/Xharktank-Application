const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({   
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    investor: {
        type: String,
        required : true
    },
    amount: {
        type: Number,
        required : true
    },
    equity: {
        type: Number,
        required : true,
        max: 100
    },
    comment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Offer' , offerSchema);
