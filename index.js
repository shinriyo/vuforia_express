"use strict";

var express = require('express')
  , wine    = require('./routes/wines')
  , dictionary = require('./routes/dictionaries');

var app = express();

app.configure(function () {
  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser());
});

/*
app.get   ('/wines',     wine.findAll);
app.get   ('/wines/:id', wine.findById);
app.post  ('/wines',     wine.addWine);
app.put   ('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
*/

app.get   ('/dictionaries', dictionary.findAll);
app.get   ('/getJapanese/:english', dictionary.findByEnglish);

//app.listen(3000);
//app.set('port', process.env.PORT || 8080);
app.listen(8080);
//console.log('Listening on port 3000...');
console.log('Listening on port 8080...');
