"use strict";

var mongoose = require('mongoose');

// Default Schemaを取得
var Schema = mongoose.Schema;

// Defaultのスキーマから新しいスキーマを定義
var DictionarySchema = new Schema({
    english: String
  , japanese: String
});

// モデル化。model('[登録名]', '定義したスキーマクラス')
mongoose.model('Dictionary', DictionarySchema);

var Dictionary;

// mongodb://[hostname]/[dbname]
//mongoose.connect('mongodb://localhost/dictionarydb');
mongoose.connect('mongodb://okazaki:vforia@emma.mongohq.com:10077/vuforia');

// mongoDB接続時のエラーハンドリング
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to 'dictionary' database");
  // 定義したときの登録名で呼び出し
  Dictionary = mongoose.model('Dictionary');
  populateDB();
});

exports.findAll = function(req, res) {
  console.log('Getting dictionarylist');

  Dictionary.find({}, function(err, results) {
    if (err) {
      res.send({'error': 'An error has occurred'});
    } else {
      console.log('Success: Getting dictionarylist');
      res.json(results);
    }
  });
};

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving dictionary: ' + id);

  Dictionary.findById(id, function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred'});
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.json(result);
    }
  });
};

exports.findByEnglish = function(req, res) {
  var english = req.params.english;
  console.log('Retrieving dictionary: ' + english);

  Dictionary.find({english: english}, function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred'});
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.json(result);
    }
  });
};

exports.addDictionary = function(req, res) {
  var dictionary = req.body;
  console.log('Adding dictionary: ' + JSON.stringify(dictionary));

  var adddictionary = new Dictionary(dictionary);
  adddictionary.save(function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred'});
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.json(result);
    }
  });
};

exports.updateDictionary = function(req, res) {
  var id = req.params.id;
  console.log('Updating dictionary: ' + id);

  var dictionary = req.body;
  delete dictionary._id;
  Dictionary.findByIdAndUpdate(id, dictionary, function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    } else {
      console.log('Success: ' + result + ' document(s) updated');
      res.send(dictionary);
    }
  });
};

exports.deleteDictionary = function(req, res) {
  var id = req.params.id;
  console.log('Deleting dictionary: ' + id);

  Dictionary.findByIdAndRemove(id, function(err, result) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    } else {
      console.log('Success: ' + result + ' document(s) deleted');
      res.send(req.body);
    }
  });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var dictionaries = [
    {
        english: "pen",
        japanese: "ペン"
    },
    {
        english: "cat",
        japanese: "猫"
    },
    {
        english: "dog",
        japanese: "犬"
    },
    {
        english: "beer",
        japanese: "ビール"
    }];

  Dictionary.remove(function(err) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    }
  });

  Dictionary.create(dictionaries, function(err) {
    if (err) {
      res.send({'error': 'An error has occurred - ' + err});
    }
  });

};
