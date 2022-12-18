const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/xharktank'
const app = express();

// Routes
const PitchesRoutes = require('./api/routes/pitches');

// Database connection
mongoose.connect(url, { 
    useNewUrlParser: true,
    useUnifiedTopology : true 
})
.then( () => {
    app.use(bodyParser.urlencoded({
        extended : false
    }))
    app.use(bodyParser.json())
    app.use( '/pitches' , PitchesRoutes);

    app.use( (req, res, next) => {
        const error = new Error('Not found');
        error.status(404);
        next(error);
    })
    
    app.use( (error , req, res, next) => {
        res.status(error.status || 404);
        res.json({
           error:{
            message : error.message
           } 
        })
    })
})
.catch( (error) => {
    console.log(error);
})

module.exports = app;
